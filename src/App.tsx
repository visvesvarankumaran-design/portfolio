import './portfolio.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './SiteLayout'
import { HomePage } from './pages/HomePage'
import { WorkPage } from './pages/WorkPage'
import { AboutPage } from './pages/AboutPage'
import { BiteSplitCaseStudy } from './pages/BiteSplitCaseStudy'
import { CarePayCaseStudy } from './pages/CarePayCaseStudy'
import { AirTicketCaseStudy } from './pages/AirTicketCaseStudy'

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
          <Route path="/about" element={<AboutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
