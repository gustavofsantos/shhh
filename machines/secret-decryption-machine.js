import { assign, createMachine } from 'xstate'
import decryptService from '../services/api/decrypt'

const initialState = {
  decryptedMessage: null,
  encryptedMessage: null,
  destinationPrivateKey: null,
  sourcePublicKey: null,
  encryptionIv: null,
  error: null
}

export function createSecretDecryptionMachine() {
  return createMachine({
    id: 'secretDecryptionMachine',
    initial: 'idle',
    context: initialState,
    states: {
      idle: {
        on: {
          START: {
            target: 'decrypting',
            actions: assign({
              encryptedMessage: (_, event) => event.data.encryptedMessage,
              destinationPrivateKey: (_, event) => event.data.destinationPrivateKey,
              sourcePublicKey: (_, event) => event.data.sourcePublicKey,
              encryptionIv: (_, event) => event.data.encryptionIv
            })
          }
        }
      },
      decrypting: {
        invoke: {
          id: 'execDecryption',
          src: (ctx) =>
            decryptService({
              data: ctx.encryptedMessage,
              sourcePublicKey: ctx.sourcePublicKey,
              destinationPrivateKey: ctx.destinationPrivateKey,
              iv: ctx.encryptionIv
            }),
          onDone: {
            target: 'ready',
            actions: assign({
              decryptedMessage: (ctx, event) => event.data.decryptedMessage
            })
          },
          onError: {
            target: 'error'
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
