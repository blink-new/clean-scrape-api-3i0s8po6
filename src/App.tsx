import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LandingPage } from './components/LandingPage'
import { Dashboard } from './components/Dashboard'
import { Documentation } from './components/Documentation'
import { Pricing } from './components/Pricing'

function App() {
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('clearfeed-api-key'))

  return (
    <div className="dark">
      <Router>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard apiKey={apiKey} setApiKey={setApiKey} />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/pricing" element={<Pricing />} />
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App