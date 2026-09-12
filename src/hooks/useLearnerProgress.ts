import { useState } from 'react'
import { defaultLearnerProgress, readLearnerProgress, writeLearnerProgress, type LearnerProgress } from '@/lib/learnerProgress'

export function useLearnerProgress() {
  const [progress, setProgress] = useState<LearnerProgress>(() => readLearnerProgress())
  const updateProgress = (update: (current: LearnerProgress) => LearnerProgress) => {
    setProgress((current) => {
      const next = update(current)
      writeLearnerProgress(next)
      return next
    })
  }
  return { progress, updateProgress, resetProgress: () => { writeLearnerProgress(defaultLearnerProgress); setProgress(defaultLearnerProgress) } }
}