import { assign, createMachine, send } from 'xstate'
import encryptService from '../services/api/encrypt'

const initialState = {
  message: null,
  destinationPublicKey: null,
  selfPrivateKey: null,
  encryptedData: null,
  encryptionIv: null,
  error: null
}

export function createSecretEncryptionMachine() {
  return createMachine({
    id: 'secretEncryptionMachine',
    initial: 'idle',
    context: initialState,
    states: {
      idle: {
        on: {
          START: {
            target: 'encrypting',
            actions: assign({
              message: (_, event) => event.data.message,
              destinationPublicKey: (_, event) => event.data.destinationPublicKey,
              selfPrivateKey: (_, event) => event.data.selfPrivateKey,
              encryptedData: null,
              encryptionIv: null,
              error: null
            })
          }
        }
      },
      encrypting: {
        invoke: {
          id: 'execEncryption',
          src: (ctx) =>
            encryptService({
              data: ctx.message,
              destinationPublicKey: ctx.destinationPublicKey,
              selfPrivateKey: ctx.selfPrivateKey
            }),
          onDone: {
            target: 'ready',
            actions: assign({
              encryptedData: (_, event) => event.data.encryptedMessage,
              encryptionIv: (_, event) => event.data.iv
            })
          },
          onError: {
            target: 'error',
            actions: assign({
              error: (_, event) => event.data
            })
          }
        }
      },
      ready: {
        on: {
          RESET: {
            target: 'idle',
            actions: assign(initialState)
          }
        }
      },
      error: {
        on: {
          DISMISS: {
            target: 'idle',
            actions: assign({
              error: null
            })
          }
        }
      }
    }
  })
}
