import { Route, Routes } from 'react-router-dom'
import { AppLayout } from '@/layouts/AppLayout'
import { ChallengePage } from '@/pages/ChallengePage'
import { DashboardPage } from '@/pages/DashboardPage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { ResourcesPage } from '@/pages/ResourcesPage'
import { RoadmapsPage } from '@/pages/RoadmapsPage'
import { ProgressPage } from '@/pages/ProgressPage'
import { RoadmapDetailPage } from '@/pages/RoadmapDetailPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="challenges" element={<ChallengePage />} />
        <Route path="roadmaps" element={<RoadmapsPage />} />
        <Route path="roadmaps/:roadmapId" element={<RoadmapDetailPage />} />
        <Route path="resources" element={<ResourcesPage />} />
        <Route path="progress" element={<ProgressPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
