export interface SystemDataInterface {
  id?: number
  name: string
  created_at: Date
  updated_at: Date
}

export interface PaginatedPSystemDataInterface {
  payload: SystemDataInterface[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
