import { useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { createEncryptionKeysMachine } from '../machines/encryption-keys-machine'

export function useEncryptionKeys() {
  const [state, send] = useMachine(createEncryptionKeysMachine())
  const loading = state.matches('loadingKeysFromStorage') || state.matches('loadingKeysFromServer')
  const keys = state.context.keys.value()
  const error = state.context.error

  const reset = () => send('RESET')

  useEffect(() => {
    send('INIT')
  }, [])

  return { loading, keys, error, reset }
}
