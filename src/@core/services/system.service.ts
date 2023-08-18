import { PaginatedPSystemDataInterface, SystemDataInterface } from '../types/system.interface'
import { api } from './axios.service'

export const SystemService = {
  getSystemPaginate: (page: number, pagesize: number) =>
    api.get<PaginatedPSystemDataInterface>('permission/PermissionPaginate', {
      params: { page: page, pagesize: pagesize }
    }),
  postSystem: (data: SystemDataInterface) => {
    return api.post('System', data).then(response => response.data)
  },
  PatchSystem: (data: SystemDataInterface) => {
    return api.patch('System', data).then(response => response.data)
  },

  DeleteSystem: (id: number) => api.delete('System', { params: { id: id } })
}
