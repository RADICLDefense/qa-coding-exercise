import { create } from 'zustand'

// Build API URLs from environment variables
// Render provides service names like "radicl-node-service" via property: host
// We need to append .onrender.com for the full domain
function buildApiUrl(envVar, defaultLocalUrl) {
  if (!envVar) {
    return defaultLocalUrl
  }
  
  // If it already has a protocol, use as-is
  if (envVar.startsWith('http://') || envVar.startsWith('https://')) {
    return envVar
  }
  
  // If it's a Render service name (no dots), append .onrender.com
  if (!envVar.includes('.')) {
    return `https://${envVar}.onrender.com`
  }
  
  // Otherwise assume it's a full domain
  return `https://${envVar}`
}

const NODE_API_URL = buildApiUrl(import.meta.env.VITE_NODE_API_URL, 'http://localhost:3001')
const GO_API_URL = buildApiUrl(import.meta.env.VITE_GO_API_URL, 'http://localhost:3002')

console.log('API URLs configured:', { NODE_API_URL, GO_API_URL })

export const useAppStore = create((set, get) => ({
  // State
  nodeHealth: null,
  goHealth: null,
  nodeData: null,
  goData: null,
  allData: [],
  securityEvents: null,
  severityDistribution: null,
  loading: true,

  // Actions
  fetchHealthStatus: async () => {
    set({ loading: true })
    try {
      const [nodeRes, goRes] = await Promise.all([
        fetch(`${NODE_API_URL}/api/health`).catch(err => ({ error: err.message })),
        fetch(`${GO_API_URL}/api/health`).catch(err => ({ error: err.message }))
      ])

      let nodeHealthData = { error: 'Service unavailable' }
      let goHealthData = { error: 'Service unavailable' }

      if (nodeRes.json) {
        nodeHealthData = await nodeRes.json()
      }

      if (goRes.json) {
        goHealthData = await goRes.json()
      }

      set({
        nodeHealth: nodeHealthData,
        goHealth: goHealthData
      })
    } catch (error) {
      console.error('Error fetching health status:', error)
    }
    set({ loading: false })
  },

  fetchNodeData: async () => {
    try {
      const response = await fetch(`${NODE_API_URL}/api/node/data`)
      const data = await response.json()
      set({ nodeData: data.data })
      get().updateAllData()
    } catch (error) {
      console.error('Error fetching Node data:', error)
      set({ nodeData: [] })
    }
  },

  fetchGoData: async () => {
    try {
      const response = await fetch(`${GO_API_URL}/api/go/data`)
      const data = await response.json()
      set({ goData: data.data })
      get().updateAllData()
    } catch (error) {
      console.error('Error fetching Go data:', error)
      set({ goData: [] })
    }
  },

  updateAllData: () => {
    const { nodeData, goData } = get()
    const combined = []
    if (nodeData) combined.push(...nodeData)
    if (goData) combined.push(...goData)
    set({ allData: combined })
  },

  fetchAllData: async () => {
    await Promise.all([get().fetchNodeData(), get().fetchGoData()])
  },

  fetchSecurityEvents: async (searchQuery = '') => {
    try {
      const url = searchQuery 
        ? `${NODE_API_URL}/api/security/events?search=${encodeURIComponent(searchQuery)}`
        : `${NODE_API_URL}/api/security/events`
      const response = await fetch(url)
      const data = await response.json()
      set({ securityEvents: data.data })
    } catch (error) {
      console.error('Error fetching security events:', error)
      set({ securityEvents: [] })
    }
  },

  fetchSeverityDistribution: async () => {
    try {
      const response = await fetch(`${NODE_API_URL}/api/security/severity-distribution`)
      const data = await response.json()
      set({ severityDistribution: data.data })
    } catch (error) {
      console.error('Error fetching severity distribution:', error)
      set({ severityDistribution: [] })
    }
  },

  refreshSecurityEvents: async () => {
    try {
      const response = await fetch(`${NODE_API_URL}/api/security/refresh-events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await response.json()
      
      if (data.success) {
        console.log('✅ Security events refreshed:', data.message)
        // Automatically refetch the data after refresh
        await get().fetchSecurityEvents()
        await get().fetchSeverityDistribution()
        return data
      } else {
        console.error('Failed to refresh events:', data.error)
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error refreshing security events:', error)
      throw error
    }
  },
}))

