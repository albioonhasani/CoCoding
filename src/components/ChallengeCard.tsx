import { ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Badge } from './ui/Badge'
import { Card } from './ui/Card'
import type { Challenge } from '@/types/content'
export function ChallengeCard({ challenge }: { challenge: Challenge }) { return <Card className="group flex h-full flex-col p-6"><div className="flex justify-between gap-3"><Badge tone={challenge.difficulty === 'beginner' ? 'green' : 'amber'}>{challenge.difficulty}</Badge><span className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400"><Clock size={15} aria-hidden="true" /> {challenge.estimatedMinutes} min</span></div><h3 className="mt-5 text-xl font-bold text-ink dark:text-white">{challenge.title}</h3><p className="mt-2 flex-1 leading-6 text-slate-600 dark:text-slate-300">{challenge.description}</p><div className="mt-5 flex items-center justify-between"><span className="text-sm font-semibold text-slate-500 dark:text-slate-400">{challenge.language}</span><Link className="inline-flex items-center gap-1 font-semibold text-brand-700 dark:text-blue-300" to="/challenges">Start <ArrowRight size={16} aria-hidden="true" /></Link></div></Card> }
