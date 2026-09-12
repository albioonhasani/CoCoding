import { resources } from './resources'
import { roadmaps } from './roadmaps'

export const getResourceById = (id: string) => resources.find((resource) => resource.id === id)
export const getResourcesByCategory = (category: string) => resources.filter((resource) => resource.category.toLowerCase() === category.toLowerCase())
export const getResourcesForRoadmapStep = (stepId: string) => resources.filter((resource) => resource.relatedStepIds.includes(stepId))
export const getRoadmapById = (id: string) => roadmaps.find((roadmap) => roadmap.id === id)
export const getRoadmapStepById = (stepId: string) => roadmaps.flatMap((roadmap) => roadmap.steps).find((step) => step.id === stepId)
