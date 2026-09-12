import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(request: VercelRequest, response: VercelResponse) {
  try {
    const [{ generateChallenge }, { apiHandler }] = await Promise.all([
      import('../server/ai/handlers'),
      import('../server/ai/vercel'),
    ])
    return apiHandler(request, response, generateChallenge)
  } catch (error) {
    console.error('Challenge API failed to load', {
      message: error instanceof Error ? error.message : 'Unknown module load error',
      hasGroqKey: Boolean(process.env.GROQ_API_KEY),
      node: process.version,
    })
    return response
      .status(500)
      .setHeader('Cache-Control', 'no-store')
      .setHeader('X-Content-Type-Options', 'nosniff')
      .json({ error: 'API_MODULE_LOAD_FAILED', message: 'AI assistance is temporarily unavailable. Please try again.' })
  }
}
