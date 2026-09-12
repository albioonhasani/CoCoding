import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from './ui/Card'
import { ProgressBar } from './ui/ProgressBar'
import type { Roadmap } from '@/types/content'
import { formatLearningTime } from '@/utils/format'
export function RoadmapCard({ roadmap, progress = 0 }: { roadmap: Roadmap; progress?: number }) { const duration = roadmap.steps.reduce((sum, step) => sum + step.estimatedMinutes, 0); return <Card className="overflow-hidden"><div className={`h-2 ${roadmap.accent}`} /><div className="p-6"><div className="flex items-center justify-between gap-3"><p className="text-sm font-bold text-slate-500 dark:text-slate-400">{roadmap.steps.length} STEPS</p><span className="text-sm text-slate-500 dark:text-slate-400">{formatLearningTime(duration)}</span></div><h3 className="mt-2 text-xl font-bold text-ink dark:text-white">{roadmap.title}</h3><p className="mt-2 min-h-12 leading-6 text-slate-600 dark:text-slate-300">{roadmap.description}</p><div className="mt-5"><ProgressBar value={progress} label="Your progress" /></div><Link to={`/roadmaps/${roadmap.id}`} className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-blue-300">View path <ArrowRight size={16} aria-hidden="true" /></Link></div></Card> }
