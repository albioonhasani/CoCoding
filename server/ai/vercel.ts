import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { TutorResult } from './types'
const maxBodyBytes = 16_384
type Endpoint = (body: unknown, client: string) => Promise<TutorResult>
const jsonError = (response: VercelResponse, status: number, error: string, message: string) => response.status(status).setHeader('Cache-Control', 'no-store').setHeader('X-Content-Type-Options', 'nosniff').json({ error, message })
function parsedBody(body: unknown) {
  if (typeof body !== 'string') return body
  try {
    return JSON.parse(body) as unknown
  } catch {
    return undefined
  }
}
export async function apiHandler(request: VercelRequest, response: VercelResponse, endpoint: Endpoint) {
  if (request.method !== 'POST') return response.status(405).setHeader('Allow', 'POST').end()
  if (!request.headers['content-type']?.toString().includes('application/json')) return jsonError(response, 415, 'UNSUPPORTED_MEDIA_TYPE', 'Content-Type must be application/json.')
  const contentLength = Number(request.headers['content-length'] ?? 0)
  const bodySize = Buffer.byteLength(typeof request.body === 'string' ? request.body : JSON.stringify(request.body ?? ''))
  if (contentLength > maxBodyBytes || bodySize > maxBodyBytes) return jsonError(response, 413, 'REQUEST_TOO_LARGE', 'Request body is too large.')
  const body = parsedBody(request.body)
  if (body === undefined) return jsonError(response, 400, 'MALFORMED_JSON', 'Malformed JSON request.')
  try {
    const result = await endpoint(body, request.headers['x-forwarded-for']?.toString().split(',')[0] ?? 'anonymous')
    return response.status(result.status).setHeader('Cache-Control', 'no-store').setHeader('X-Content-Type-Options', 'nosniff').json(result.body)
  } catch {
    return jsonError(response, 500, 'UNEXPECTED_SERVER_ERROR', 'AI assistance is temporarily unavailable. Please try again.')
  }
}
