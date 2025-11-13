import { Sidebar } from './Sidebar'
import { DashboardHeader } from './DashboardHeader'

export function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-dark-grey-900 overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        <main className="flex-1 overflow-y-auto bg-dark-grey-900 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

