import { useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage'
type CompletionMap = Record<string, string[]>
const storageKey = 'codepath-roadmap-completions'
export function useRoadmapProgress(roadmapId: string, stepIds: string[]) { const [completions, setCompletions] = useLocalStorage<CompletionMap>(storageKey, {}); const completedStepIds = useMemo(() => completions[roadmapId] ?? [], [completions, roadmapId]); const progress = useMemo(() => stepIds.length === 0 ? 0 : Math.round((completedStepIds.filter((id) => stepIds.includes(id)).length / stepIds.length) * 100), [completedStepIds, stepIds]); const toggleStep = (stepId: string) => setCompletions({ ...completions, [roadmapId]: completedStepIds.includes(stepId) ? completedStepIds.filter((id) => id !== stepId) : [...completedStepIds, stepId] }); return { completedStepIds, progress, isComplete: (stepId: string) => completedStepIds.includes(stepId), toggleStep } }
