export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type ResourceType = 'youtube-channel' | 'youtube-video' | 'documentation' | 'tutorial' | 'course' | 'practice' | 'article'
export type ResourceCategory = 'Programming Fundamentals' | 'JavaScript' | 'Python' | 'React' | 'HTML & CSS' | 'Git & GitHub' | 'Computer Science' | 'APIs' | 'AI Development'

export interface Challenge {
  id: string
  title: string
  description: string
  difficulty: Difficulty
  language: string
  estimatedMinutes: number
  topics: string[]
  roadmapStepId?: string
}

export interface RoadmapStep {
  id: string
  title: string
  description: string
  difficulty: Difficulty
  estimatedMinutes: number
  concepts: string[]
  resourceIds: string[]
  challengeTopics: string[]
}

export interface Roadmap {
  id: string
  title: string
  description: string
  category: string
  accent: string
  steps: RoadmapStep[]
}

export interface Resource {
  id: string
  title: string
  description: string
  provider: string
  type: ResourceType
  category: ResourceCategory
  difficulty: Difficulty
  url: string
  tags: string[]
  relatedStepIds: string[]
  recommended?: boolean
}

export interface Progress {
  roadmapId: string
  completedStepIds: string[]
  completedChallengeIds: string[]
  lastActiveAt?: string
  streakDays: number
}

export interface UserPreferences {
  theme: 'light' | 'dark'
  highContrast: boolean
  reducedMotion: boolean
}
