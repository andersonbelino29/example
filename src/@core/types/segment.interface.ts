export interface SegmentDataInterface {
  id?: number
  segment_name: string
  created_at: Date
  updated_at: Date
}

export interface PaginatedPSegmentDataInterface {
  payload: SegmentDataInterface[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
