import { readLocalStorage, writeLocalStorage } from './storage'

export type LearningDifficulty = 'beginner' | 'easy' | 'intermediate'
export type LearnerActivity = { id: string; title: string; type: 'challenge' | 'roadmap'; completedAt: string }
export type LearnerProgress = {
  version: 1
  completedChallengeIds: string[]
  attemptedChallengeIds: string[]
  completedStepIds: Record<string, string[]>
  exploredResourceIds: string[]
  currentRoadmapId: string | null
  currentStepId: string | null
  preferredLanguage: string
  learningPreferences: { topic: string; difficulty: LearningDifficulty }
  recentActivities: LearnerActivity[]
}

export const learnerProgressKey = 'codepath-learner-progress'
export const defaultLearnerProgress: LearnerProgress = {
  version: 1,
  completedChallengeIds: [],
  attemptedChallengeIds: [],
  completedStepIds: {},
  exploredResourceIds: [],
  currentRoadmapId: null,
  currentStepId: null,
  preferredLanguage: 'javascript',
  learningPreferences: { topic: 'variables', difficulty: 'beginner' },
  recentActivities: [],
}

function asStringArray(value: unknown) { return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [] }

function normalizeProgress(value: unknown): LearnerProgress {
  if (!value || typeof value !== 'object') return defaultLearnerProgress
  const stored = value as Partial<LearnerProgress>
  const completedStepIds = stored.completedStepIds && typeof stored.completedStepIds === 'object' ? Object.fromEntries(Object.entries(stored.completedStepIds).map(([id, steps]) => [id, asStringArray(steps)])) : {}
  const recentActivities = Array.isArray(stored.recentActivities) ? stored.recentActivities.filter((activity): activity is LearnerActivity => Boolean(activity) && typeof activity === 'object' && typeof (activity as LearnerActivity).id === 'string' && typeof (activity as LearnerActivity).title === 'string' && typeof (activity as LearnerActivity).completedAt === 'string' && ((activity as LearnerActivity).type === 'challenge' || (activity as LearnerActivity).type === 'roadmap')).slice(0, 8) : []
  return {
    ...defaultLearnerProgress,
    ...stored,
    version: 1,
    completedChallengeIds: asStringArray(stored.completedChallengeIds),
    attemptedChallengeIds: asStringArray(stored.attemptedChallengeIds),
    completedStepIds,
    exploredResourceIds: asStringArray(stored.exploredResourceIds),
    currentRoadmapId: typeof stored.currentRoadmapId === 'string' ? stored.currentRoadmapId : null,
    currentStepId: typeof stored.currentStepId === 'string' ? stored.currentStepId : null,
    preferredLanguage: typeof stored.preferredLanguage === 'string' ? stored.preferredLanguage : defaultLearnerProgress.preferredLanguage,
    learningPreferences: { ...defaultLearnerProgress.learningPreferences, ...(stored.learningPreferences ?? {}) },
    recentActivities,
  }
}

export function readLearnerProgress() {
  const progress = normalizeProgress(readLocalStorage<unknown>(learnerProgressKey, defaultLearnerProgress))
  const legacyCompletions = readLocalStorage<Record<string, string[]>>('codepath-roadmap-completions', {})
  const completedStepIds = Object.keys(legacyCompletions).length ? { ...legacyCompletions, ...progress.completedStepIds } : progress.completedStepIds
  return { ...progress, completedStepIds, currentRoadmapId: progress.currentRoadmapId ?? Object.keys(completedStepIds)[0] ?? null }
}

export function writeLearnerProgress(progress: LearnerProgress) { writeLocalStorage(learnerProgressKey, normalizeProgress(progress)) }

export function recordResourceExplored(resourceId: string) {
  const progress = readLearnerProgress()
  if (!progress.exploredResourceIds.includes(resourceId)) writeLearnerProgress({ ...progress, exploredResourceIds: [...progress.exploredResourceIds, resourceId] })
}