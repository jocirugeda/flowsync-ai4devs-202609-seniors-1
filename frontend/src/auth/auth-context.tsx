import { useState, type ReactNode } from 'react'
import * as authApi from '@/auth/api'
import { AuthContext, type AuthContextValue } from '@/auth/context'
import type { AuthSession } from '@/auth/types'

const STORAGE_KEY = 'flowsync:auth'

function readStoredSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthSession) : null
  } catch {
    return null
  }
}

function writeStoredSession(session: AuthSession | null) {
  if (session) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
  } else {
    localStorage.removeItem(STORAGE_KEY)
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(() => readStoredSession())

  const persist = (next: AuthSession) => {
    writeStoredSession(next)
    setSession(next)
  }

  const value: AuthContextValue = {
    user: session?.user ?? null,
    token: session?.token ?? null,
    login: async (input) => {
      persist(await authApi.login(input))
    },
    signup: async (input) => {
      persist(await authApi.signup(input))
    },
    clearSession: () => {
      writeStoredSession(null)
      setSession(null)
    },
  }

  return <AuthContext value={value}>{children}</AuthContext>
}
