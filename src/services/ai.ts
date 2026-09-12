import type { AIFeedbackRequest, AIFeedbackResponse, AIChallengeRequest, AIChallengeResponse, AIExplainRequest, AIExplainResponse, AIHintRequest, AIHintResponse } from '@/types/ai'
type ApiError = { error?: string; message?: string }
export class AIClientError extends Error {
  constructor(public readonly kind: 'validation' | 'ai-service' | 'network', message: string, public readonly code?: string) {
    super(message)
  }
}
const aiErrorCodes = new Set(['MISSING_GROQ_API_KEY', 'GROQ_AUTH_FAILED', 'GROQ_RATE_LIMITED', 'GROQ_UPSTREAM_ERROR', 'GROQ_TIMEOUT', 'GROQ_MALFORMED_RESPONSE', 'AI_MALFORMED_RESPONSE'])
async function diagnoseApiReachability(status: number) {
  try {
    const health = await fetch('/api/health', { method: 'GET', headers: { Accept: 'application/json' }, cache: 'no-store' })
    const contentType = health.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) return `The AI endpoint returned HTTP ${status}, and the Vercel API health route is not returning JSON. The API functions may not be deployed in this environment.`
    const payload = await health.json() as { hasGroqKey?: boolean }
    if (health.ok && payload.hasGroqKey === false) return 'The API is running, but this Vercel environment cannot see GROQ_API_KEY.'
    if (health.ok) return `The API is running, but /api/challenge returned HTTP ${status} instead of JSON. Check the Vercel function logs for /api/challenge.`
    return `The AI endpoint returned HTTP ${status}, and /api/health returned HTTP ${health.status}. Check the Vercel deployment logs.`
  } catch {
    return `The AI endpoint returned HTTP ${status} instead of JSON. Check whether Vercel deployed the /api functions.`
  }
}
async function post<TResponse>(path: '/api/challenge' | '/api/hint' | '/api/feedback' | '/api/explain', body: object): Promise<TResponse> {
  let response: Response
  try {
    response = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
  } catch {
    throw new AIClientError('network', 'Network connection failed. Please check your connection and try again.')
  }
  if (!(response.headers.get('content-type') || '').includes('application/json')) {
    throw new AIClientError('network', await diagnoseApiReachability(response.status), 'NON_JSON_API_RESPONSE')
  }
  let payload: (TResponse & ApiError) | null = null
  try {
    payload = await response.json() as TResponse & ApiError
  } catch {
    throw new AIClientError('network', 'Could not reach the AI service. Please try again.')
  }
  if (!response.ok) {
    const code = payload?.error
    const kind = code && aiErrorCodes.has(code) ? 'ai-service' : 'validation'
    throw new AIClientError(kind, payload?.message || 'AI assistance is temporarily unavailable. Please try again.', code)
  }
  return payload as TResponse
}
/** Same-origin API clients only. No API key or Groq SDK is included in the browser bundle. */
export const aiService = { generateChallenge: (request: AIChallengeRequest) => post<AIChallengeResponse>('/api/challenge', request), generateHint: (request: AIHintRequest) => post<AIHintResponse>('/api/hint', request), analyzeFeedback: (request: AIFeedbackRequest) => post<AIFeedbackResponse>('/api/feedback', request), explain: (request: AIExplainRequest) => post<AIExplainResponse>('/api/explain', request) }
