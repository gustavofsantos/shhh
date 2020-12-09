import { generateKeys } from '../../lib/crypto'

export default function generateKeysHandler(req, res) {
  const { privateKey, publicKey } = generateKeys()

  res.statusCode = 200
  res.json({ privateKey, publicKey })
}
