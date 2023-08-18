import CryptoJS from 'crypto-js'

const PRIVATE_KEY: string = process.env.NEXT_PUBLIC_PRIVATE_KEY || ''
const decodedKey = decodeBase64(PRIVATE_KEY)

function encrypt(data: string) {
  const dataString = JSON.stringify(data)
  const ciphertext = CryptoJS.AES.encrypt(dataString, decodedKey).toString()

  return ciphertext + '£'
}

function decrypt(ciphertext: string) {
  ciphertext = ciphertext.slice(0, -1)
  const bytes = CryptoJS.AES.decrypt(ciphertext, decodedKey)
  const originalData = bytes.toString(CryptoJS.enc.Utf8)
  const data = JSON.parse(originalData)

  return data
}

function decodeBase64(base64String: string): string {
  const decryptedString = Buffer.from(base64String, 'base64').toString('utf-8')

  return decryptedString
}

function encodeBase64(data: string): string {
  const encodedString = Buffer.from(data, 'utf-8').toString('base64')

  return encodedString
}

export { encrypt, decrypt, encodeBase64, decodeBase64 }
