import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import { analyzeFeedback, explainContent, generateChallenge, generateHint } from './ai/handlers'
import type { TutorResult } from './ai/types'

const maxBodyBytes = 16_384
async function readJson(request: IncomingMessage): Promise<unknown> { let size = 0; let raw = ''; for await (const chunk of request) { size += Buffer.byteLength(chunk); if (size > maxBodyBytes) throw new Error('body-too-large'); raw += chunk } try { return JSON.parse(raw) as unknown } catch { throw new Error('invalid-json') } }
function send(response: ServerResponse, result: TutorResult) { response.writeHead(result.status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); response.end(JSON.stringify(result.body)) }
function clientId(request: IncomingMessage) { return request.socket.remoteAddress ?? 'local' }
const routes: Record<string, (body: unknown, client: string) => Promise<TutorResult>> = { '/api/challenge': generateChallenge, '/api/hint': generateHint, '/api/feedback': analyzeFeedback, '/api/explain': explainContent }
export function groqDevApi(): Plugin { return { name: 'codepath-ai-dev-api', configureServer(server) { server.middlewares.use(async (request: IncomingMessage, response: ServerResponse, next) => { const handler = routes[request.url?.split('?')[0] ?? '']; if (!handler) return next(); if (request.method !== 'POST') { response.writeHead(405, { Allow: 'POST' }); response.end(); return } if (!request.headers['content-type']?.includes('application/json')) { send(response, { status: 415, body: { error: 'Content-Type must be application/json.' } }); return } try { send(response, await handler(await readJson(request), clientId(request))) } catch (error) { const message = error instanceof Error && error.message === 'body-too-large' ? 'Request body is too large.' : 'Malformed JSON request.'; send(response, { status: 400, body: { error: message } }) } }) } } }
