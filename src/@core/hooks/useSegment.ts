import { AxiosError } from 'axios'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { handleMutationError, handleMutationSuccess } from '../utils/mutation-Helpers'
import { PaginatedPSegmentDataInterface, SegmentDataInterface } from '../types/segment.interface'
import { segmentService } from '../services/segment.service'

export function useGetSegmentPaginate(page: number, pageSize: number) {
  return useQuery<PaginatedPSegmentDataInterface, AxiosError>(
    ['SegmentPaginate', page, pageSize],
    () => segmentService.getSegmentPaginate(page, pageSize).then(response => response.data),
    {
      enabled: !!pageSize,
      retry: 0,
      refetchOnWindowFocus: false,
      cacheTime: 0
    }
  )
}

export function usePostSegment() {
  const [mutateError, setMutateError] = useState<{ status: number | undefined; message: string; errors: any } | null>(
    null
  )
  const [mutateData, setMutateData] = useState<SegmentDataInterface | null>(null)

  const mutation = useMutation<SegmentDataInterface, AxiosError, SegmentDataInterface>(
    data => segmentService.postSegment(data),
    {
      onSuccess: data => handleMutationSuccess(data, setMutateData),
      onError: error => handleMutationError(error, setMutateError)
    }
  )

  return { mutateError, mutateData, ...mutation }
}

export function usePatchSegment() {
  const [mutateError, setMutateError] = useState<{ status: number | undefined; message: string; errors: any } | null>(
    null
  )
  const [mutateData, setMutateData] = useState<SegmentDataInterface | null>(null)

  const mutation = useMutation<SegmentDataInterface, AxiosError, SegmentDataInterface>(
    data => segmentService.PatchSegment(data),
    {
      onSuccess: data => handleMutationSuccess(data, setMutateData),
      onError: error => handleMutationError(error, setMutateError)
    }
  )

  return { mutateError, mutateData, ...mutation }
}

export function usePostDeleteSegment() {
  const [mutateError, setMutateError] = useState<{ status: number | undefined; message: string; errors: any } | null>(
    null
  )
  const [mutateData, setMutateData] = useState<number | null>(null)

  const mutation = useMutation<number, AxiosError, number>(
    id => segmentService.DeleteSegment(id).then(response => response.data),
    {
      onSuccess: data => handleMutationSuccess(data, setMutateData),
      onError: error => handleMutationError(error, setMutateError)
    }
  )

  return { mutateError, mutateData, ...mutation }
}
