import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'GET') return response.status(405).setHeader('Allow', 'GET').end()
  return response
    .status(200)
    .setHeader('Cache-Control', 'no-store')
    .setHeader('X-Content-Type-Options', 'nosniff')
    .json({
      ok: true,
      runtime: 'vercel-node',
      node: process.version,
      hasGroqKey: Boolean(process.env.GROQ_API_KEY),
      model: process.env.GROQ_MODEL || 'openai/gpt-oss-20b',
      routes: ['/api/challenge', '/api/hint', '/api/feedback', '/api/explain'],
    })
}
