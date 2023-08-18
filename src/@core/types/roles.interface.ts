export interface RolesInterface {
  id: number
  nome: string
  titulo: string
  total_usuarios: number
  avatares: string[]
}

export interface RolesPermissionInterface {
  idFuncao: number
  nome: string
  titulo: string
  permissoes: PermissionInterface[]
}

export interface PermissionInterface {
  idPermissao: number
  nome_permissao: string
  ler: boolean
  criar: boolean
  atualizar: boolean
  deletar: boolean
}
