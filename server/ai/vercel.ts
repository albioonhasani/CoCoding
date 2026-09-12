import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { TutorResult } from './types'
const maxBodyBytes = 16_384
type Endpoint = (body: unknown, client: string) => Promise<TutorResult>
export async function apiHandler(request: VercelRequest, response: VercelResponse, endpoint: Endpoint) { if (request.method !== 'POST') return response.status(405).setHeader('Allow', 'POST').end(); if (!request.headers['content-type']?.includes('application/json')) return response.status(415).json({ error: 'Content-Type must be application/json.' }); const contentLength = Number(request.headers['content-length'] ?? 0); if (contentLength > maxBodyBytes) return response.status(413).json({ error: 'Request body is too large.' }); const result = await endpoint(request.body, request.headers['x-forwarded-for']?.toString().split(',')[0] ?? 'anonymous'); return response.status(result.status).setHeader('Cache-Control', 'no-store').json(result.body) }
