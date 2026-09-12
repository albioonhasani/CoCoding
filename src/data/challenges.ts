import type { Challenge } from '@/types/content'
export const challenges: Challenge[] = [
  { id: 'js-say-hello', title: 'Say hello', description: 'Write a function that returns a friendly greeting.', difficulty: 'beginner', language: 'JavaScript', estimatedMinutes: 10, topics: ['functions', 'strings'], roadmapStepId: 'js-functions' },
  { id: 'js-count-vowels', title: 'Count the vowels', description: 'Use a loop and conditional to count vowels in a word.', difficulty: 'beginner', language: 'JavaScript', estimatedMinutes: 15, topics: ['loops', 'conditionals'], roadmapStepId: 'js-loops' },
  { id: 'js-shopping-list', title: 'Make a shopping list', description: 'Practice reading and adding values in an array.', difficulty: 'beginner', language: 'JavaScript', estimatedMinutes: 20, topics: ['arrays'], roadmapStepId: 'js-arrays' },
]
