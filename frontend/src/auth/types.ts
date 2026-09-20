export type AuthUser = {
  id: number
  fullName: string | null
  email: string
  createdAt: string
  updatedAt: string
  initials: string
}

export type AuthSession = {
  user: AuthUser
  token: string
}

export type LoginInput = {
  email: string
  password: string
}

export type SignupInput = {
  fullName: string | null
  email: string
  password: string
  passwordConfirmation: string
}

export type ApiFieldError = {
  message: string
  rule?: string
  field?: string
}
