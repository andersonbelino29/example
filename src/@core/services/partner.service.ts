import { PaginatedPPartnerDataInterface, PartnerDataInterface } from '../types/partner.interface'
import { api } from './axios.service'

export const PartnerService = {
  getPartnerPaginate: (page: number, pagesize: number) =>
    api.get<PaginatedPPartnerDataInterface>('permission/PermissionPaginate', {
      params: { page: page, pagesize: pagesize }
    }),
  postPartner: (data: PartnerDataInterface) => {
    return api.post('Partner', data).then(response => response.data)
  },
  PatchPartner: (data: PartnerDataInterface) => {
    return api.patch('Partner', data).then(response => response.data)
  },

  DeletePartner: (id: number) => api.delete('Partner', { params: { id: id } })
}
