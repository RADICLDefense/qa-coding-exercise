import { useState } from 'react'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const menuItems = [
  { name: 'Dashboard', icon: DashboardIcon, active: true },
]

const bottomMenuItems = [
  { name: 'Service Health Status', icon: MonitorHeartIcon, link: '/service-health' },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-dark-grey-800 text-white hover:bg-dark-grey-700 transition-colors"
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-dark-grey-900 border-r border-dark-grey-700
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          flex flex-col h-screen
        `}
      >
        {/* Logo Section */}
        <div className="p-6">
          <img 
            src="https://www.radicl.com/hubfs/RADICL_Logos_RADICL-FULL-White-RADOrange.svg" 
            alt="RADICL Logo" 
            className="w-full h-auto"
          />
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto py-6">
          <nav className="px-3 space-y-1">
            <div className="px-3 mb-2">
              <span className="text-dark-grey-500 text-sm font-semibold uppercase tracking-wider">
                Navigation
              </span>
            </div>
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-all duration-200
                  ${
                    item.active
                      ? 'bg-dark-grey-700 text-white shadow-lg'
                      : 'text-dark-grey-500 hover:bg-dark-grey-800 hover:text-white'
                  }
                `}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </nav>

          {/* Components Section */}
          <nav className="px-3 mt-8 space-y-1">
            <div className="px-3 mb-2">
              <span className="text-dark-grey-500 text-sm font-semibold uppercase tracking-wider">
                Components
              </span>
            </div>
            {bottomMenuItems.map((item) => (
              item.link ? (
                <Link
                  key={item.name}
                  to={item.link}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-dark-grey-500 hover:bg-dark-grey-800 hover:text-white transition-all duration-200"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ) : (
                <button
                  key={item.name}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-dark-grey-500 hover:bg-dark-grey-800 hover:text-white transition-all duration-200"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              )
            ))}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="p-4 border-t border-dark-grey-700">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-dark-grey-800 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-dark-grey-700 flex items-center justify-center text-white font-semibold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">John Doe</p>
              <p className="text-dark-grey-500 text-sm truncate">Super Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

