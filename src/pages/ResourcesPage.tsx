import { useMemo, useState } from 'react'
import { BookOpen, Compass, Search } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { ResourceCard } from '@/components/ResourceCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { Input } from '@/components/ui/Input'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Select } from '@/components/ui/Select'
import { resources } from '@/data/resources'

const categories = ['All categories', 'Programming Fundamentals', 'JavaScript', 'Python', 'React', 'HTML & CSS', 'Git & GitHub', 'Computer Science', 'APIs', 'AI Development'] as const
const types = ['All types', 'youtube-channel', 'youtube-video', 'documentation', 'tutorial', 'course', 'practice', 'article'] as const
const difficulties = ['All levels', 'beginner', 'intermediate', 'advanced'] as const
type Sort = 'recommended' | 'beginner' | 'alphabetical'

export function ResourcesPage() {
  const [searchParams] = useSearchParams()
  const stepId = searchParams.get('step')
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<(typeof categories)[number]>('All categories')
  const [type, setType] = useState<(typeof types)[number]>('All types')
  const [difficulty, setDifficulty] = useState<(typeof difficulties)[number]>('All levels')
  const [sort, setSort] = useState<Sort>('recommended')
  const visible = useMemo(() => resources.filter((resource) => {
    const queryMatches = `${resource.title} ${resource.provider} ${resource.description} ${resource.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())
    return queryMatches && (!stepId || resource.relatedStepIds.includes(stepId)) && (category === 'All categories' || resource.category === category) && (type === 'All types' || resource.type === type) && (difficulty === 'All levels' || resource.difficulty === difficulty)
  }).sort((a, b) => sort === 'alphabetical' ? a.title.localeCompare(b.title) : sort === 'beginner' ? Number(b.difficulty === 'beginner') - Number(a.difficulty === 'beginner') || a.title.localeCompare(b.title) : Number(Boolean(b.recommended)) - Number(Boolean(a.recommended)) || a.title.localeCompare(b.title)), [query, category, type, difficulty, sort, stepId])
  const recommended = (stepId ? visible : resources.filter((resource) => resource.recommended)).slice(0, 3)
  return <div className="space-y-14"><section><SectionHeader eyebrow={stepId ? 'For this roadmap step' : 'Curated, not crowded'} title="Resources worth your time" description={stepId ? 'These resources are linked directly to the step you are working on.' : 'Trusted material for learning at your own pace. You do not need every resource here—choose one that fits the step you are on.'} /><div className="mt-8 grid gap-4 rounded-2xl border border-brand-100 bg-brand-50 p-6 dark:border-brand-950 dark:bg-brand-950/40 sm:grid-cols-[auto_1fr]"><Compass className="text-brand-700 dark:text-blue-300" aria-hidden="true" size={26} /><div><h2 className="font-bold text-ink dark:text-white">Start here, then keep it simple</h2><p className="mt-1 max-w-3xl leading-7 text-slate-700 dark:text-slate-200">Start with one beginner-friendly tutorial or course for your chosen topic. Use documentation when you need a detail, and practice after each small concept. Depth beats collecting bookmarks.</p></div></div></section><section aria-labelledby="recommended-heading"><SectionHeader eyebrow="A gentle first pick" title={stepId ? 'Resources for this step' : 'Recommended for beginners'} /><div className="mt-6 grid gap-5 md:grid-cols-3">{recommended.length ? recommended.map((resource) => <ResourceCard resource={resource} key={resource.id} />) : <CardlessEmpty />}</div></section><section aria-labelledby="all-resources-heading"><SectionHeader eyebrow="Browse the library" title="All resources" /><div className="mt-7 grid gap-3 lg:grid-cols-4"><div className="relative lg:col-span-2"><label htmlFor="resource-search" className="sr-only">Search resources</label><Search className="pointer-events-none absolute left-3 top-3 text-slate-400" size={19} aria-hidden="true" /><Input id="resource-search" className="pl-10" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search titles, providers, and topics" /></div><FilterSelect id="resource-category" label="Filter by category" value={category} onChange={setCategory} options={categories} /><FilterSelect id="resource-type" label="Filter by resource type" value={type} onChange={setType} options={types} /></div><div className="mt-3 grid gap-3 sm:grid-cols-2"><FilterSelect id="resource-difficulty" label="Filter by difficulty" value={difficulty} onChange={setDifficulty} options={difficulties} /><div><label htmlFor="resource-sort" className="sr-only">Sort resources</label><Select id="resource-sort" value={sort} onChange={(event) => setSort(event.target.value as Sort)}><option value="recommended">Sort: Recommended</option><option value="beginner">Sort: Beginner friendly</option><option value="alphabetical">Sort: Alphabetical</option></Select></div></div><p className="mt-5 text-sm text-slate-600 dark:text-slate-300" aria-live="polite">{visible.length} {visible.length === 1 ? 'resource' : 'resources'} found</p>{visible.length ? <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{visible.map((resource) => <ResourceCard resource={resource} key={resource.id} />)}</div> : <div className="mt-5"><EmptyState icon={<BookOpen aria-hidden="true" />} title="No resources match those filters" message="Try clearing a filter or searching for a broader topic." /></div>}</section></div>
}

function FilterSelect<T extends string>({ id, label, value, onChange, options }: { id: string; label: string; value: T; onChange: (value: T) => void; options: readonly T[] }) { return <div><label htmlFor={id} className="sr-only">{label}</label><Select id={id} value={value} onChange={(event) => onChange(event.target.value as T)}>{options.map((option) => <option value={option} key={option}>{option.replace(/-/g, ' ')}</option>)}</Select></div> }
function CardlessEmpty() { return <p className="text-sm text-slate-600 dark:text-slate-300">No linked recommendations are available for this step yet.</p> }
