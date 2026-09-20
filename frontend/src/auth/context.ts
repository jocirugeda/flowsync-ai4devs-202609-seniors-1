import { createContext } from 'react'
import type { AuthUser, LoginInput, SignupInput } from '@/auth/types'

export type AuthContextValue = {
  user: AuthUser | null
  token: string | null
  login: (input: LoginInput) => Promise<void>
  signup: (input: SignupInput) => Promise<void>
  clearSession: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
