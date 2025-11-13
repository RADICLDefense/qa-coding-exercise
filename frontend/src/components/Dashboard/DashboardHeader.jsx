import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import NotificationsIcon from '@mui/icons-material/Notifications'
import BackupIcon from '@mui/icons-material/Backup'
import SecurityIcon from '@mui/icons-material/Security'
import BugReportIcon from '@mui/icons-material/BugReport'
import SyncIcon from '@mui/icons-material/Sync'
import LockIcon from '@mui/icons-material/Lock'
import { useAppStore } from '../../store/useAppStore'

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState('')
  const { fetchSecurityEvents } = useAppStore()

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      fetchSecurityEvents(searchQuery)
    }
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  return (
    <header className="bg-dark-grey-900 border-b border-dark-grey-700 sticky top-0 z-20">
      <div className="px-6 py-4">
        {/* Top Row: Welcome and Search */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              SECURITY <span className="text-burnt-orange">ANALYTICS</span>
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-grey-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search event types (e.g., Malware)"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleSearch}
                className="pl-10 pr-4 py-2 bg-dark-grey-800 border border-dark-grey-700 rounded-lg text-white placeholder-dark-grey-500 focus:outline-none focus:ring-2 focus:ring-burnt-orange w-64"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg bg-dark-grey-800 text-white hover:bg-dark-grey-700 transition-colors">
              <NotificationsIcon className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-burnt-orange rounded-full"></span>
            </button>

            {/* User Avatar */}
            <div className="w-10 h-10 rounded-full bg-dark-grey-700 flex items-center justify-center text-white font-semibold cursor-pointer hover:ring-2 ring-burnt-orange transition-all">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

