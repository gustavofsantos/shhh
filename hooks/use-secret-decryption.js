import { useMachine } from '@xstate/react'
import { createSecretDecryptionMachine } from '../machines/secret-decryption-machine'

export function useSecretDecryption() {
  const [state, send] = useMachine(createSecretDecryptionMachine())
  const loading = state.matches('decrypting')
  const error = state.context.error
  const data = state.context.decryptedMessage

  const decrypt = ({ data, destinationPrivateKey, sourcePublicKey, iv }) =>
    send({
      type: 'START',
      data: {
        encryptedMessage: data,
        destinationPrivateKey,
        sourcePublicKey,
        encryptionIv: iv
      }
    })

  return { decrypt, data, loading, error }
}
