import { useMachine } from '@xstate/react'
import { createSecretEncryptionMachine } from '../machines/secret-encryption-machine'

export function useSecretEncryption() {
  const [state, send] = useMachine(createSecretEncryptionMachine())
  const loading = state.matches('encrypting')
  const encryptedMessage = state.context.encryptedData
  const encryptionIv = state.context.encryptionIv

  const encrypt = ({ message, destinationPublicKey, selfPrivateKey }) =>
    send({ type: 'START', data: { message, destinationPublicKey, selfPrivateKey } })

  return {
    loading,
    data: encryptedMessage ? { encryptedMessage, encryptionIv } : null,
    encrypt
  }
}
