export interface ErrCallbackInterface {
  (err: { [key: string]: string }): void
}

export interface LoginParamsInterface {
  email: string
  password: string
  rememberMe?: boolean
}

export interface UserAcessesInterface {
  access_token: string
  refresh_token: string
  userData: UserDataInterface
}

export interface UserDataInterface {
  id: number
  nome: string
  funcao: string
  email: string
  password: string
  nom_senha: string
  telefone: string
  url_foto?: string | null
  flag_ativo: boolean
  permissions: userPermissionsInterface[]
}

export interface userPermissionsInterface {
  nome: string
  assunto: string
  ler?: boolean
  criar?: boolean
  atualizar?: boolean
  deletar?: boolean
  [key: string]: string | number | boolean | undefined
}

export interface AuthValuesInterface {
  loading: boolean
  logout: () => void
  user: UserDataInterface | null
  setLoading: (value: boolean) => void
  setUser: (value: UserDataInterface | null) => void
  login: (params: LoginParamsInterface, errorCallback?: ErrCallbackInterface) => void
}
