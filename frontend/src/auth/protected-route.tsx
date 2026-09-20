import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '@/auth/use-auth'

export function ProtectedRoute() {
  const { token } = useAuth()
  const location = useLocation()

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
