import { encrypt } from '../../lib/crypto'

export default async function encryptHandler(req, res) {
  const { data, destinationPublicKey, selfPrivateKey } = req.body

  const { encryptedMessage, signature, iv } = await encrypt(
    data,
    destinationPublicKey,
    selfPrivateKey
  )

  res.statusCode = 200
  res.json({ encryptedMessage, signature, iv })
}
