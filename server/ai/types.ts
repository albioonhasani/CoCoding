export const supportedLanguages = ['javascript', 'typescript', 'python', 'java', 'cpp', 'csharp'] as const
export type SupportedLanguage = (typeof supportedLanguages)[number]
export const supportedTopics = ['variables', 'conditionals', 'loops', 'functions', 'arrays', 'objects', 'strings', 'algorithms', 'classes', 'array-methods', 'dom', 'async', 'apis', 'components', 'state', 'html', 'css', 'git'] as const
export type SupportedTopic = (typeof supportedTopics)[number]
export const allowedTopicsByLanguage: Record<SupportedLanguage, readonly SupportedTopic[]> = {
  javascript: supportedTopics,
  typescript: supportedTopics,
  python: ['variables', 'conditionals', 'loops', 'functions', 'arrays', 'objects', 'strings', 'algorithms', 'classes'],
  java: ['variables', 'conditionals', 'loops', 'functions', 'arrays', 'objects', 'strings', 'algorithms', 'classes'],
  cpp: ['variables', 'conditionals', 'loops', 'functions', 'arrays', 'strings', 'algorithms', 'classes'],
  csharp: ['variables', 'conditionals', 'loops', 'functions', 'arrays', 'objects', 'strings', 'algorithms', 'classes'],
}
export type AIRequestError = { status: number; message: string }
export type ChallengeDifficulty = 'beginner' | 'easy' | 'intermediate'
export type ChallengeInput = { language: SupportedLanguage; topic: SupportedTopic; difficulty: ChallengeDifficulty; context?: string }
export type HintInput = ChallengeInput & { code: string; hintLevel: 1 | 2 | 3 }
export type FeedbackInput = ChallengeInput & { code: string; challenge: { title: string; description: string; evaluationGuidance: string } }
export type ExplanationLevel = 'beginner' | 'intermediate' | 'technical'
export type ExplainInput = { content: string; language?: SupportedLanguage; topic?: SupportedTopic; level: ExplanationLevel; context?: 'concept' | 'challenge' | 'code' | 'error' | 'term' }
export type TutorResult = { status: number; body: unknown }
