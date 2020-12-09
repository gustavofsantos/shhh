import { decrypt, encrypt, generateKeys } from './crypto'

describe('Crypto lib', () => {
  const aliceKeys = generateKeys()
  const bobKeys = generateKeys()
  const eveKeys = generateKeys()

  test('Alice should encrypt a message to bob', async () => {
    const message = 'the super secret'

    const { encryptedMessage, iv } = await encrypt(message, bobKeys.publicKey, aliceKeys.privateKey)
    const { decryptedMessage } = await decrypt(
      encryptedMessage,
      bobKeys.privateKey,
      aliceKeys.publicKey,
      iv
    )

    expect(decryptedMessage).toBe(message)
  })
})
