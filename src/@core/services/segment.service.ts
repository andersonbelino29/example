import { api } from './axios.service'
import { PaginatedPSegmentDataInterface, SegmentDataInterface } from '../types/segment.interface'

export const segmentService = {
  getSegmentPaginate: (page: number, pagesize: number) =>
    api.get<PaginatedPSegmentDataInterface>('permission/PermissionPaginate', {
      params: { page: page, pagesize: pagesize }
    }),
  postSegment: (data: SegmentDataInterface) => {
    return api.post('Segment', data).then(response => response.data)
  },
  PatchSegment: (data: SegmentDataInterface) => {
    return api.patch('Segment', data).then(response => response.data)
  },

  DeleteSegment: (id: number) => api.delete('Segment', { params: { id: id } })
}
