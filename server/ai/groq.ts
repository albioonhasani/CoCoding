const endpoint = 'https://api.groq.com/openai/v1/chat/completions'
const timeoutMs = 15_000
const maxResponseBytes = 128_000
const model = () => process.env.GROQ_MODEL || 'openai/gpt-oss-20b'
export type AIServiceErrorCode = 'MISSING_GROQ_API_KEY' | 'GROQ_AUTH_FAILED' | 'GROQ_RATE_LIMITED' | 'GROQ_UPSTREAM_ERROR' | 'GROQ_TIMEOUT' | 'GROQ_MALFORMED_RESPONSE'
export class AIServiceError extends Error {
  constructor(public readonly status: number, public readonly code: AIServiceErrorCode, message = 'AI assistance is temporarily unavailable. Please try again.') {
    super(message)
  }
}
const parseJson = (raw: string) => {
  try {
    return JSON.parse(raw) as unknown
  } catch {
    return null
  }
}
const stripJsonFence = (value: string) => value.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')
export async function getStructuredTutorResponse(system: string, user: string): Promise<unknown> {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) throw new AIServiceError(503, 'MISSING_GROQ_API_KEY')
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      signal: controller.signal,
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: model(), temperature: 0.4, max_completion_tokens: 1_200, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: system }, { role: 'user', content: user }] }),
    })
    const raw = await response.text()
    if (raw.length > maxResponseBytes) throw new AIServiceError(502, 'GROQ_MALFORMED_RESPONSE')
    const payload = parseJson(raw) as { choices?: Array<{ message?: { content?: string } }> } | null
    if (response.status === 401 || response.status === 403) throw new AIServiceError(503, 'GROQ_AUTH_FAILED')
    if (response.status === 429) throw new AIServiceError(429, 'GROQ_RATE_LIMITED', 'AI assistance is busy. Please try again shortly.')
    if (!response.ok) throw new AIServiceError(502, 'GROQ_UPSTREAM_ERROR')
    if (!payload) throw new AIServiceError(502, 'GROQ_MALFORMED_RESPONSE')
    const content = payload.choices?.[0]?.message?.content
    if (!content) throw new AIServiceError(502, 'GROQ_MALFORMED_RESPONSE')
    const parsed = parseJson(stripJsonFence(content))
    if (!parsed) throw new AIServiceError(502, 'GROQ_MALFORMED_RESPONSE')
    return parsed
  } catch (error) {
    if (error instanceof AIServiceError) throw error
    if (error instanceof DOMException && error.name === 'AbortError') throw new AIServiceError(504, 'GROQ_TIMEOUT')
    throw new AIServiceError(502, 'GROQ_UPSTREAM_ERROR')
  } finally {
    clearTimeout(timeout)
  }
}
