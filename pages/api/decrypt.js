import { decrypt } from '../../lib/crypto'

export default async function decryptHandler(req, res) {
  const { data, destinationPrivateKey, sourcePublicKey, iv } = req.body

  const { decryptedMessage } = await decrypt(data, destinationPrivateKey, sourcePublicKey, iv)

  res.statusCode = 200
  res.json({ decryptedMessage })
}
