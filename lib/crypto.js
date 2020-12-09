import { createECDH, scrypt, randomFill, createCipheriv, createDecipheriv } from 'crypto'
import env from '../config/env'

const defaultEncoding = 'base64'

export function generateKeys() {
  const ecdh = createECDH('secp256k1')
  ecdh.generateKeys()

  const publicKey = ecdh.getPublicKey(defaultEncoding)
  const privateKey = ecdh.getPrivateKey(defaultEncoding)

  return { publicKey, privateKey }
}

export async function encrypt(message, destinationPublicKey, sourcePrivateKey) {
  const selfECDH = createECDH('secp256k1')
  selfECDH.setPrivateKey(sourcePrivateKey, defaultEncoding)
  const sharedKey = selfECDH.computeSecret(destinationPublicKey, defaultEncoding, defaultEncoding)

  const { encrypted, iv } = await symmetricEncrypt(message, sharedKey)

  return { encryptedMessage: encrypted, signature: 'abc', iv }
}

export async function decrypt(encryptedText, destinationPrivateKey, sourcePublicKey, iv) {
  const selfECDH = createECDH('secp256k1')
  selfECDH.setPrivateKey(destinationPrivateKey, defaultEncoding)
  const sharedKey = selfECDH.computeSecret(sourcePublicKey, defaultEncoding, defaultEncoding)

  const decryptedMessage = await symmetricDecrypt(encryptedText, sharedKey, iv)

  return { decryptedMessage }
}

function symmetricDecrypt(data, password, ivBase64) {
  const algorithm = 'aes-192-cbc'
  const salt = env.serverSalt()
  const iv = Buffer.from(ivBase64, 'base64')

  return new Promise((resolve, reject) => {
    scrypt(password, salt, 24, (err, key) => {
      if (err) return reject(err)
      const decipher = createDecipheriv(algorithm, key, iv)
      let decrypted = decipher.update(data, defaultEncoding, 'utf8')
      decrypted += decipher.final('utf8')

      resolve(decrypted)
    })
  })
}

function symmetricEncrypt(data, password) {
  const algorithm = 'aes-192-cbc'
  const salt = env.serverSalt()

  return new Promise((resolve, reject) => {
    scrypt(password, salt, 24, (err, key) => {
      if (err) return reject(err)

      randomFill(new Uint8Array(16), (err, iv) => {
        if (err) return reject(err)
        const cipher = createCipheriv(algorithm, key, iv)
        let encrypted = cipher.update(data, 'utf8', defaultEncoding)
        encrypted += cipher.final(defaultEncoding)

        resolve({ encrypted, iv: Buffer.from(iv).toString('base64') })
      })
    })
  })
}
