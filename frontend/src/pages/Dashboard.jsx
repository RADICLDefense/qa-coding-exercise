import { DashboardLayout } from '../components/Dashboard/DashboardLayout'
import { MetricCards } from '../components/Dashboard/MetricCards'
import { ActiveSecurityIncidents } from '../components/Dashboard/ActiveSecurityIncidents'
import { EventSeverityTagCloud } from '../components/Dashboard/EventSeverityTagCloud'
import { GeographicThreatMap } from '../components/Dashboard/GeographicThreatMap'
import { TopThreatTypes } from '../components/Dashboard/TopThreatTypes'
import { SecurityEventsTable } from '../components/Dashboard/SecurityEventsTable'

export function Dashboard() {
  // Set loading to false - components will use placeholder content
  const loading = false

  return (
    <>
      <DashboardLayout>
      {/* Top Metric Cards */}
      <MetricCards loading={loading} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6 auto-rows-fr">
        {/* Active Security Incidents - Spans 2 columns */}
        <div className="xl:col-span-2 flex flex-col">
          <ActiveSecurityIncidents loading={loading} />
        </div>

        
         {/* Event Severity Distribution */}
         <div className="flex flex-col">
          <EventSeverityTagCloud loading={loading} />
        </div>
      </div>

      {/* Second Row Grid - Real-time Security Events */}
      <div className="mb-6">
        <SecurityEventsTable />
      </div>

      {/* Third Row Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 auto-rows-fr">
       {/* Top Threat Types */}
       <div className="flex flex-col">
          <TopThreatTypes loading={loading} />
        </div>
        
        {/* Geographic Threat Map */}
        <div className="flex flex-col">
          <GeographicThreatMap loading={loading} />
        </div>
      </div>
    </DashboardLayout>
    </>
  )
}

