// This file is a temporary solution to simulate server state
// In a real app, you would use a database to store this information

interface ServerState {
  leads: number
  tickets: number
  revenue: number
}

// Initial server state
let serverState: ServerState = {
  leads: 1284,
  tickets: 42,
  revenue: 128450,
}

// Function to get the current server state
export function getServerState(): ServerState {
  return { ...serverState }
}

// Function to update the server state
export function updateServerState(newState: Partial<ServerState>): ServerState {
  serverState = { ...serverState, ...newState }
  return getServerState()
}

// Simulate server activity by randomly changing values
setInterval(() => {
  if (typeof window === "undefined") return // Only run on client

  const leadChange = Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0
  const ticketChange = Math.random() > 0.6 ? Math.floor(Math.random() * 3) + 1 : 0
  const revenueChange = Math.random() > 0.8 ? Math.floor(Math.random() * 1000) + 500 : 0

  updateServerState({
    leads: serverState.leads + leadChange,
    tickets: Math.max(0, serverState.tickets + (Math.random() > 0.5 ? ticketChange : -ticketChange)),
    revenue: serverState.revenue + revenueChange,
  })
}, 30000) // Every 30 seconds
