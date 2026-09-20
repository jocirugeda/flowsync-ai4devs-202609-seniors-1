import { Alert, AlertDescription } from '@/components/ui/alert'
import type { ApiFieldError } from '@/auth/types'

export function ApiErrorAlert({ errors }: { errors: ApiFieldError[] }) {
  if (errors.length === 0) {
    return null
  }

  return (
    <Alert variant="destructive">
      <AlertDescription>
        {errors.map((error, index) => (
          <p key={index}>{error.message}</p>
        ))}
      </AlertDescription>
    </Alert>
  )
}
