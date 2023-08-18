export interface ProcessDataInterface {
  id?: number
  nome: string
  descricao: string
  assunto: string
  atribuidoa: string[]
  dataCriacao: string
}

export interface PaginatedPProcessDataInterface {
  payload: ProcessDataInterface[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
