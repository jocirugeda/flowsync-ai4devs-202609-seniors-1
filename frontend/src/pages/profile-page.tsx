import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ApiErrorAlert } from '@/components/api-error-alert'
import { useAuth } from '@/auth/use-auth'
import { fetchProfile } from '@/auth/api'
import { ApiError } from '@/lib/api-client'
import type { ApiFieldError, AuthUser } from '@/auth/types'

export function ProfilePage() {
  const { token, clearSession } = useAuth()
  const navigate = useNavigate()

  const [profile, setProfile] = useState<AuthUser | null>(null)
  const [errors, setErrors] = useState<ApiFieldError[]>([])

  useEffect(() => {
    if (!token) return

    fetchProfile(token)
      .then(setProfile)
      .catch((error: unknown) => {
        if (error instanceof ApiError && error.status === 401) {
          clearSession()
          navigate('/login', { replace: true })
          return
        }
        setErrors(
          error instanceof ApiError
            ? error.errors
            : [{ message: 'Ha ocurrido un error inesperado' }]
        )
      })
  }, [token, clearSession, navigate])

  return (
    <div className="mx-auto flex min-h-svh max-w-sm flex-col justify-center gap-6 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Tu perfil</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <ApiErrorAlert errors={errors} />
          {profile ? (
            <dl className="flex flex-col gap-2 text-sm">
              <div>
                <dt className="text-muted-foreground">Nombre</dt>
                <dd>{profile.fullName ?? '—'}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Email</dt>
                <dd>{profile.email}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Iniciales</dt>
                <dd>{profile.initials}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Miembro desde</dt>
                <dd>{new Date(profile.createdAt).toLocaleDateString()}</dd>
              </div>
            </dl>
          ) : (
            errors.length === 0 && <p className="text-sm text-muted-foreground">Cargando…</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
