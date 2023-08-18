export interface responseAccessData {
  payload: AccessData
}

export interface AccessData {
  customerName: string
  restToken: string
  wsKey: string
  activeFlag: boolean
}
