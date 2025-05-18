interface User {
  email: string
  name: string
}

// Mock credentials for demo purposes
const MOCK_EMAIL = "user@cortexcrm.com"
const MOCK_PASSWORD = "password123"
const TOKEN_KEY = "cortexcrm_auth_token"
const USER_KEY = "cortexcrm_user"

export const login = (email: string, password: string): boolean => {
  if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
    // Generate a mock token
    const token = `mock_token_${Date.now()}`

    // Store token and user info in localStorage
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(
      USER_KEY,
      JSON.stringify({
        email,
        name: "Demo User",
      }),
    )

    return true
  }

  return false
}

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
}

export const isAuthenticated = (): boolean => {
  if (typeof window === "undefined") return false

  const token = localStorage.getItem(TOKEN_KEY)
  return !!token
}

export const getUser = (): User | null => {
  if (typeof window === "undefined") return null

  const userJson = localStorage.getItem(USER_KEY)
  if (!userJson) return null

  try {
    return JSON.parse(userJson) as User
  } catch (error) {
    return null
  }
}
