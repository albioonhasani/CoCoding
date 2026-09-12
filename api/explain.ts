import type { VercelRequest, VercelResponse } from '@vercel/node'
import { explainContent } from '../server/ai/handlers'
import { apiHandler } from '../server/ai/vercel'

export default async function handler(request: VercelRequest, response: VercelResponse) { return apiHandler(request, response, explainContent) }
