import './portfolio.css'
import { lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './SiteLayout'
import { HomePage } from './pages/HomePage'

// Home is eager (the landing); everything else loads on demand as its own
// chunk, so the first paint ships less JavaScript.
const WorkPage = lazy(() =>
  import('./pages/WorkPage').then((m) => ({ default: m.WorkPage })),
)
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const BiteSplitCaseStudy = lazy(() =>
  import('./pages/BiteSplitCaseStudy').then((m) => ({
    default: m.BiteSplitCaseStudy,
  })),
)
const CarePayCaseStudy = lazy(() =>
  import('./pages/CarePayCaseStudy').then((m) => ({
    default: m.CarePayCaseStudy,
  })),
)
const AirTicketCaseStudy = lazy(() =>
  import('./pages/AirTicketCaseStudy').then((m) => ({
    default: m.AirTicketCaseStudy,
  })),
)
const DailyDiaryCaseStudy = lazy(() =>
  import('./pages/DailyDiaryCaseStudy').then((m) => ({
    default: m.DailyDiaryCaseStudy,
  })),
)

export default function App() {
  return (
    <BrowserRouter unstable_useTransitions={false}>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/bitesplit" element={<BiteSplitCaseStudy />} />
          <Route path="/work/carepay" element={<CarePayCaseStudy />} />
          <Route path="/work/air-ticket" element={<AirTicketCaseStudy />} />
          <Route path="/work/daily-diary" element={<DailyDiaryCaseStudy />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
