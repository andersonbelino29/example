import { AxiosError } from 'axios'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { handleMutationError, handleMutationSuccess } from '../utils/mutation-Helpers'
import { PartnerService } from '../services/partner.service'
import { PaginatedPPartnerDataInterface, PartnerDataInterface } from '../types/partner.interface'

export function useGetPartnerPaginate(page: number, pageSize: number) {
  return useQuery<PaginatedPPartnerDataInterface, AxiosError>(
    ['PartnerPaginate', page, pageSize],
    () => PartnerService.getPartnerPaginate(page, pageSize).then(response => response.data),
    {
      enabled: !!pageSize,
      retry: 0,
      refetchOnWindowFocus: false,
      cacheTime: 0
    }
  )
}

export function usePostPartner() {
  const [mutateError, setMutateError] = useState<{ status: number | undefined; message: string; errors: any } | null>(
    null
  )
  const [mutateData, setMutateData] = useState<PartnerDataInterface | null>(null)

  const mutation = useMutation<PartnerDataInterface, AxiosError, PartnerDataInterface>(
    data => PartnerService.postPartner(data),
    {
      onSuccess: data => handleMutationSuccess(data, setMutateData),
      onError: error => handleMutationError(error, setMutateError)
    }
  )

  return { mutateError, mutateData, ...mutation }
}

export function usePatchPartner() {
  const [mutateError, setMutateError] = useState<{ status: number | undefined; message: string; errors: any } | null>(
    null
  )
  const [mutateData, setMutateData] = useState<PartnerDataInterface | null>(null)

  const mutation = useMutation<PartnerDataInterface, AxiosError, PartnerDataInterface>(
    data => PartnerService.PatchPartner(data),
    {
      onSuccess: data => handleMutationSuccess(data, setMutateData),
      onError: error => handleMutationError(error, setMutateError)
    }
  )

  return { mutateError, mutateData, ...mutation }
}

export function usePostDeletePartner() {
  const [mutateError, setMutateError] = useState<{ status: number | undefined; message: string; errors: any } | null>(
    null
  )
  const [mutateData, setMutateData] = useState<number | null>(null)

  const mutation = useMutation<number, AxiosError, number>(
    id => PartnerService.DeletePartner(id).then(response => response.data),
    {
      onSuccess: data => handleMutationSuccess(data, setMutateData),
      onError: error => handleMutationError(error, setMutateError)
    }
  )

  return { mutateError, mutateData, ...mutation }
}
