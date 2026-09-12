export type ChallengeDifficulty = 'beginner' | 'easy' | 'intermediate'
export type ChallengeLanguage = 'javascript' | 'typescript' | 'python' | 'java' | 'cpp' | 'csharp'
export interface AIChallengeRequest { topic: string; difficulty: ChallengeDifficulty; language: ChallengeLanguage; context?: string }
export interface AIChallengeResponse { title: string; description: string; starterCode: string; expectedConcepts: string[]; testCases: Array<{ input: string; expectedOutput: string }>; evaluationGuidance: string; hints: string[]; solution?: string }
export interface AIHintRequest extends AIChallengeRequest { code: string; hintLevel: 1 | 2 | 3 }
export interface AIHintResponse { hint: string; explanation: string; level: 1 | 2 | 3 }
export interface AIFeedbackRequest extends AIChallengeRequest { code: string; challenge: Pick<AIChallengeResponse, 'title' | 'description' | 'evaluationGuidance'> }
export interface AIFeedbackResponse { summary: string; correctness: string; strengths: string[]; likelyBugs: string[]; conceptualMistakes: string[]; improvements: string[]; nextStep: string }
export type ExplanationLevel = 'beginner' | 'intermediate' | 'technical'
export interface AIExplainRequest { content: string; language?: ChallengeLanguage; topic?: string; level: ExplanationLevel; context?: 'concept' | 'challenge' | 'code' | 'error' | 'term' }
export interface AIExplainResponse { explanation: string; keyTerms: Array<{ term: string; meaning: string }>; simpleExample?: string; level: ExplanationLevel }
