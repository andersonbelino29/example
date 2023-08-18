import { AxiosError } from 'axios'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { handleMutationError, handleMutationSuccess } from '../utils/mutation-Helpers'
import { ProcessService } from '../services/process.service'
import { PaginatedPProcessDataInterface, ProcessDataInterface } from '../types/process.interface'

export function useGetProcessPaginate(page: number, pageSize: number) {
  return useQuery<PaginatedPProcessDataInterface, AxiosError>(
    ['ProcessPaginate', page, pageSize],
    () => ProcessService.getProcessPaginate(page, pageSize).then(response => response.data),
    {
      enabled: !!pageSize,
      retry: 0,
      refetchOnWindowFocus: false,
      cacheTime: 0
    }
  )
}

export function usePostProcess() {
  const [mutateError, setMutateError] = useState<{ status: number | undefined; message: string; errors: any } | null>(
    null
  )
  const [mutateData, setMutateData] = useState<ProcessDataInterface | null>(null)

  const mutation = useMutation<ProcessDataInterface, AxiosError, ProcessDataInterface>(
    data => ProcessService.postProcess(data),
    {
      onSuccess: data => handleMutationSuccess(data, setMutateData),
      onError: error => handleMutationError(error, setMutateError)
    }
  )

  return { mutateError, mutateData, ...mutation }
}

export function usePatchProcess() {
  const [mutateError, setMutateError] = useState<{ status: number | undefined; message: string; errors: any } | null>(
    null
  )
  const [mutateData, setMutateData] = useState<ProcessDataInterface | null>(null)

  const mutation = useMutation<ProcessDataInterface, AxiosError, ProcessDataInterface>(
    data => ProcessService.PatchProcess(data),
    {
      onSuccess: data => handleMutationSuccess(data, setMutateData),
      onError: error => handleMutationError(error, setMutateError)
    }
  )

  return { mutateError, mutateData, ...mutation }
}

export function usePostDeleteProcess() {
  const [mutateError, setMutateError] = useState<{ status: number | undefined; message: string; errors: any } | null>(
    null
  )
  const [mutateData, setMutateData] = useState<number | null>(null)

  const mutation = useMutation<number, AxiosError, number>(
    id => ProcessService.DeleteProcess(id).then(response => response.data),
    {
      onSuccess: data => handleMutationSuccess(data, setMutateData),
      onError: error => handleMutationError(error, setMutateError)
    }
  )

  return { mutateError, mutateData, ...mutation }
}
