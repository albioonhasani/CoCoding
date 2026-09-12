import type { ReactNode } from 'react'
import { Award, Flame, Target } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { SectionHeader } from '@/components/ui/SectionHeader'
export function ProgressPage() { return <div><SectionHeader eyebrow="Your journey" title="Progress that grows with you" description="Your learning progress is stored locally on this device." /><div className="mt-8 grid gap-5 md:grid-cols-3"><Metric icon={<Flame aria-hidden="true" />} value="3 days" label="Learning streak" /><Metric icon={<Target aria-hidden="true" />} value="25%" label="Roadmap complete" /><Metric icon={<Award aria-hidden="true" />} value="2" label="Challenges finished" /></div><Card className="mt-8 p-6"><h2 className="text-xl font-bold text-ink dark:text-white">Programming foundations</h2><p className="mt-2 text-slate-600 dark:text-slate-300">3 of 12 lessons complete</p><div className="mt-6 max-w-2xl"><ProgressBar label="Learning progress" value={25} /></div></Card></div> }
function Metric({ icon, value, label }: { icon: ReactNode; value: string; label: string }) { return <Card className="p-6"><div className="text-brand-700 dark:text-blue-300">{icon}</div><p className="mt-5 text-3xl font-bold text-ink dark:text-white">{value}</p><p className="mt-1 text-slate-600 dark:text-slate-300">{label}</p></Card> }
