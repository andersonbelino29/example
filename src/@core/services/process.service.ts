import { PaginatedPProcessDataInterface, ProcessDataInterface } from '../types/process.interface'
import { api } from './axios.service'

export const ProcessService = {
  getProcessPaginate: (page: number, pagesize: number) =>
    api.get<PaginatedPProcessDataInterface>('permission/PermissionPaginate', {
      params: { page: page, pagesize: pagesize }
    }),
  postProcess: (data: ProcessDataInterface) => {
    return api.post('Process', data).then(response => response.data)
  },
  PatchProcess: (data: ProcessDataInterface) => {
    return api.patch('Process', data).then(response => response.data)
  },

  DeleteProcess: (id: number) => api.delete('Process', { params: { id: id } })
}
