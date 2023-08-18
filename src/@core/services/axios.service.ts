import axios from 'axios'

import { decodeBase64, decrypt, encrypt } from 'src/@core/utils/crypto'

const isDevelopment = process.env.NODE_ENV === 'development'

const baseURL = isDevelopment ? 'http://10.1.28.67:3001/api/' : 'https://production-url.com/api/'

export const api = axios.create({ baseURL })

/*const refreshToken = async () => {
  console.log('Refreshing token')
  const newToken = 'novo_token'
  localStorage.setItem('token', newToken)
}*/

/*const handleUnauthorizedError = async (error: any) => {
  if (error.response && error.response.status === 401) {
    try {
      const newToken = await refreshToken()

      const originalRequest = error.config
      originalRequest.headers.Authorization = `Bearer ${newToken}`

      return api(originalRequest)
    } catch (refreshError) {
      throw refreshError
    }
  }

  throw error
}*/

api.interceptors.request.use(config => {
  let defaultToken = process.env.NEXT_PUBLIC_DEFAULT_TOKEN
  const encryption = process.env.NEXT_PUBLIC_ENCRIPTION || 'true'

  if (config.url === 'access/BuscaParceiroPorNome' || config.url === 'access/BuscaMenuItensParceiro') {
    if (defaultToken) {
      const defaultTokenBase64 = decodeBase64(defaultToken)
      defaultToken = encrypt(defaultTokenBase64)
      config.headers.tokenautentication = `${defaultToken}`
    }
  } else {
    let partnerEncrypt = localStorage.getItem('partner')
    const jwtToken = localStorage.getItem('accessToken')

    if (jwtToken) {
      config.headers.Authorization = `Bearer ${jwtToken}`
    } else if (partnerEncrypt) {
      partnerEncrypt = decrypt(partnerEncrypt)
      if (partnerEncrypt !== null) {
        const partner = JSON.parse(partnerEncrypt)
        const tokenpartnet = encrypt(partner.restToken)
        config.headers.tokenautentication = `${tokenpartnet}`
      }
    } else if (defaultToken) {
      const defaultTokenBase64 = decodeBase64(defaultToken)
      defaultToken = encrypt(defaultTokenBase64)
      config.headers.tokenautentication = `${defaultToken}`
    }
  }

  config.headers['x-use-encryption'] = encryption

  if (config.data) {
    config.data = {
      ciphertext: encrypt(config.data)
    }
  }

  return config
})

api.interceptors.response.use(
  response => {
    if (response.data && response.data.ciphertext) {
      let decryptedData = decrypt(response.data.ciphertext)

      if (typeof decryptedData === 'string') {
        decryptedData = JSON.parse(decryptedData)
      }

      response.data = decryptedData
    }

    return response
  },
  error => {
    if (error.response.data && error.response.data.ciphertext) {
      let decryptedData = decrypt(error.response.data.ciphertext)

      if (typeof decryptedData === 'string') {
        decryptedData = JSON.parse(decryptedData)
      }

      error.response.data = decryptedData
    }

    if (error.response && error.response.status !== 401) {
      return Promise.reject(error)
    }

    return Promise.reject(error)

    //return handleUnauthorizedError(error);
  }
)
