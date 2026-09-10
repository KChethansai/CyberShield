import { create } from 'zustand'
import { api } from '../api/client'

//separate from gameStore: identity state only. the httpOnly cookie is the
//session — nothing sensitive lives here, so no persistence plugin needed.
export const useAuth = create((set) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  error: '',

  clearError: () => set({ error: '' }),

  //restore session on app load
  checkMe: async () => {
    set({ loading: true })
    try {
      const { user } = await api.getMe()
      set({ user, isAuthenticated: true, loading: false, error: '' })
    } catch {
      set({ user: null, isAuthenticated: false, loading: false })
    }
  },

  register: async ({ username, email, password }) => {
    set({ loading: true, error: '' })
    try {
      const { user } = await api.register({ username, email, password })
      set({ user, isAuthenticated: true, loading: false })
      return true
    } catch (err) {
      set({ loading: false, error: err.message || 'Registration failed' })
      return false
    }
  },

  login: async ({ identifier, password }) => {
    set({ loading: true, error: '' })
    try {
      const { user } = await api.login({ identifier, password })
      set({ user, isAuthenticated: true, loading: false })
      return true
    } catch (err) {
      set({ loading: false, error: err.message || 'Sign in failed' })
      return false
    }
  },

  logout: async () => {
    try {
      await api.logout()
    } catch {}
    set({ user: null, isAuthenticated: false, error: '' })
  },

  //kept in sync when a signed-in operative files a score
  noteScore: (totalScore, badge) =>
    set((state) => {
      if (!state.user || totalScore <= (state.user.bestScore || 0)) return state
      return { user: { ...state.user, bestScore: totalScore, badge: badge || state.user.badge } }
    }),
}))
