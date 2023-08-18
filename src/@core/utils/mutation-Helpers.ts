// mutationHelpers.ts

import { AxiosError } from 'axios'

export function handleMutationSuccess<T>(data: T, setData: React.Dispatch<React.SetStateAction<T | null>>) {
  if (data && typeof data === 'object' && 'payload' in data) {
    setData(data.payload as T)
  }
}

export function handleMutationError(error: AxiosError, setError: React.Dispatch<React.SetStateAction<any | null>>) {
  const response = error?.response
  const errorData = response?.data as { errors?: any }
  const newError = {
    status: response?.status,
    message: error?.message,
    errors: errorData?.errors
  }
  setError(newError)
}
