import { Link } from 'react-router-dom'
import { DashboardLayout } from '../components/Dashboard/DashboardLayout'
import { ServiceHealthStatus } from '../components/Dashboard/ServiceHealthStatus'

export function ServiceHealth() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link 
          to="/" 
          className="text-dashboard-blue hover:text-sky-blue transition-colors inline-flex items-center gap-2"
        >
          ← Back to Dashboard
        </Link>
      </div>
      
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-light-grey-100 mb-2">Service Health Status</h1>
        <p className="text-light-grey-400">Monitor the health and status of all backend services</p>
      </div>

      <div className="max-w-2xl">
        <ServiceHealthStatus />
      </div>
    </DashboardLayout>
  )
}

