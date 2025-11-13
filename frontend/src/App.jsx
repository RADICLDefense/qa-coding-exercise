import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard'
import { HealthCheck } from './pages/HealthCheck'
import { ServiceHealth } from './pages/ServiceHealth'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/health" element={<HealthCheck />} />
      <Route path="/service-health" element={<ServiceHealth />} />
    </Routes>
  )
}

export default App
