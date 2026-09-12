import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import { analyzeFeedback, explainContent, generateChallenge, generateHint } from './ai/handlers'
import type { TutorResult } from './ai/types'

const maxBodyBytes = 16_384
class RequestBodyError extends Error { constructor(public readonly status: 400 | 413, message: string) { super(message) } }
async function readJson(request: IncomingMessage): Promise<unknown> { let size = 0; let raw = ''; for await (const chunk of request) { size += Buffer.byteLength(chunk); if (size > maxBodyBytes) throw new RequestBodyError(413, 'Request body is too large.'); raw += chunk } try { return JSON.parse(raw) as unknown } catch { throw new RequestBodyError(400, 'Malformed JSON request.') } }
function send(response: ServerResponse, result: TutorResult) { response.writeHead(result.status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' }); response.end(JSON.stringify(result.body)) }
const fail = (status: number, error: string, message: string) => ({ status, body: { error, message } })
function clientId(request: IncomingMessage) { return request.socket.remoteAddress ?? 'local' }
const routes: Record<string, (body: unknown, client: string) => Promise<TutorResult>> = { '/api/challenge': generateChallenge, '/api/hint': generateHint, '/api/feedback': analyzeFeedback, '/api/explain': explainContent }
export function groqDevApi(): Plugin { return { name: 'codepath-ai-dev-api', configureServer(server) { server.middlewares.use(async (request: IncomingMessage, response: ServerResponse, next) => { const handler = routes[request.url?.split('?')[0] ?? '']; if (!handler) return next(); if (request.method !== 'POST') { response.writeHead(405, { Allow: 'POST' }); response.end(); return } if (!request.headers['content-type']?.includes('application/json')) { send(response, fail(415, 'UNSUPPORTED_MEDIA_TYPE', 'Content-Type must be application/json.')); return } try { send(response, await handler(await readJson(request), clientId(request))) } catch (error) { if (error instanceof RequestBodyError) { send(response, fail(error.status, error.status === 413 ? 'REQUEST_TOO_LARGE' : 'MALFORMED_JSON', error.message)); return } send(response, fail(500, 'UNEXPECTED_SERVER_ERROR', 'AI assistance is temporarily unavailable. Please try again.')) } }) } } }
