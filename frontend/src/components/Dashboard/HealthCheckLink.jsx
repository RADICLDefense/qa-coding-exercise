import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'

export function HealthCheckLink() {
  const scrollToHealthCheck = () => {
    const element = document.getElementById('health-check-section')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <button
      onClick={scrollToHealthCheck}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-burnt-orange to-deep-purple text-white rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
    >
      <HealthAndSafetyIcon className="w-5 h-5" />
      <span className="font-medium">Health Check</span>
    </button>
  )
}

