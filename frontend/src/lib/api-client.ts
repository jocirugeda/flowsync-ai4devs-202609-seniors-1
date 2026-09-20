import { API_BASE_URL } from '@/lib/env'
import type { ApiFieldError } from '@/auth/types'

export class ApiError extends Error {
  status: number
  errors: ApiFieldError[]

  constructor(status: number, errors: ApiFieldError[]) {
    super(errors[0]?.message ?? 'Unexpected error')
    this.status = status
    this.errors = errors
  }
}

type ApiFetchOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: unknown
  token?: string | null
}

export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options

  const headers: Record<string, string> = {
    Accept: 'application/json',
  }
  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  let response: Response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new ApiError(0, [{ message: 'No se pudo conectar con el servidor' }])
  }

  const json = await response.json().catch(() => null)

  if (!response.ok) {
    const errors: ApiFieldError[] = json?.errors ?? [{ message: 'Ha ocurrido un error inesperado' }]
    throw new ApiError(response.status, errors)
  }

  return (json?.data ?? json) as T
}
