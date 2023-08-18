import { AxiosError } from 'axios'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { handleMutationError, handleMutationSuccess } from '../utils/mutation-Helpers'
import { SystemService } from '../services/system.service'
import { PaginatedPSystemDataInterface, SystemDataInterface } from '../types/system.interface'

export function useGetSystemPaginate(page: number, pageSize: number) {
  return useQuery<PaginatedPSystemDataInterface, AxiosError>(
    ['SystemPaginate', page, pageSize],
    () => SystemService.getSystemPaginate(page, pageSize).then(response => response.data),
    {
      enabled: !!pageSize,
      retry: 0,
      refetchOnWindowFocus: false,
      cacheTime: 0
    }
  )
}

export function usePostSystem() {
  const [mutateError, setMutateError] = useState<{ status: number | undefined; message: string; errors: any } | null>(
    null
  )
  const [mutateData, setMutateData] = useState<SystemDataInterface | null>(null)

  const mutation = useMutation<SystemDataInterface, AxiosError, SystemDataInterface>(
    data => SystemService.postSystem(data),
    {
      onSuccess: data => handleMutationSuccess(data, setMutateData),
      onError: error => handleMutationError(error, setMutateError)
    }
  )

  return { mutateError, mutateData, ...mutation }
}

export function usePatchSystem() {
  const [mutateError, setMutateError] = useState<{ status: number | undefined; message: string; errors: any } | null>(
    null
  )
  const [mutateData, setMutateData] = useState<SystemDataInterface | null>(null)

  const mutation = useMutation<SystemDataInterface, AxiosError, SystemDataInterface>(
    data => SystemService.PatchSystem(data),
    {
      onSuccess: data => handleMutationSuccess(data, setMutateData),
      onError: error => handleMutationError(error, setMutateError)
    }
  )

  return { mutateError, mutateData, ...mutation }
}

export function usePostDeleteSystem() {
  const [mutateError, setMutateError] = useState<{ status: number | undefined; message: string; errors: any } | null>(
    null
  )
  const [mutateData, setMutateData] = useState<number | null>(null)

  const mutation = useMutation<number, AxiosError, number>(
    id => SystemService.DeleteSystem(id).then(response => response.data),
    {
      onSuccess: data => handleMutationSuccess(data, setMutateData),
      onError: error => handleMutationError(error, setMutateError)
    }
  )

  return { mutateError, mutateData, ...mutation }
}
