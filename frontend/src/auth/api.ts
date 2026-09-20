import { apiFetch } from '@/lib/api-client'
import type { AuthSession, AuthUser, LoginInput, SignupInput } from '@/auth/types'

export function login(input: LoginInput): Promise<AuthSession> {
  return apiFetch<AuthSession>('/api/v1/auth/login', { method: 'POST', body: input })
}

export function signup(input: SignupInput): Promise<AuthSession> {
  return apiFetch<AuthSession>('/api/v1/auth/signup', { method: 'POST', body: input })
}

export function fetchProfile(token: string): Promise<AuthUser> {
  return apiFetch<AuthUser>('/api/v1/account/profile', { token })
}
