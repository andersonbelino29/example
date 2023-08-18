export interface PartnerDataInterface {
  id?: number
  nome: string
  descricao: string
  assunto: string
  atribuidoa: string[]
  dataCriacao: string
}

export interface PaginatedPPartnerDataInterface {
  payload: PartnerDataInterface[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
