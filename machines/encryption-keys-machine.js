import { assign, createMachine } from 'xstate'
import { maybe, Nothing } from '../lib/maybe'
import generateKeysService from '../services/api/generate'
import loadKeysService from '../services/local/load-keys'
import storeKeysService from '../services/local/store-keys'
import clearKeysService from '../services/local/clear-keys'

export function createEncryptionKeysMachine() {
  return createMachine({
    id: 'encryptionKeysMachine',
    initial: 'idle',
    context: {
      keys: Nothing(),
      error: null
    },
    states: {
      idle: {
        on: {
          INIT: 'loadingKeysFromStorage'
        }
      },
      loadingKeysFromStorage: {
        invoke: {
          id: 'loadLocalKeys',
          src: () => loadKeysService(),
          onDone: {
            target: 'ready',
            actions: assign({
              keys: (_, event) => maybe(event.data)
            })
          },
          onError: {
            target: 'loadingKeysFromServer'
          }
        }
      },
      loadingKeysFromServer: {
        invoke: {
          id: 'fetchKeys',
          src: generateKeysService,
          onDone: {
            target: 'persistKeys',
            actions: assign({
              keys: (_, event) => maybe(event.data)
            })
          },
          onError: {
            target: 'error'
          }
        }
      },
      persistKeys: {
        invoke: {
          id: 'storeKeys',
          src: (ctx) => storeKeysService(ctx.keys.value()),
          onDone: {
            target: 'ready'
          }
        }
      },
      loadingResetKeys: {
        invoke: {
          id: 'resetKeys',
          src: clearKeysService,
          onDone: {
            target: 'loadingKeysFromServer'
          }
        }
      },
      ready: {
        on: {
          RESET: 'loadingResetKeys'
        }
      },
      error: {
        on: {
          RETRY: 'loadingKeysFromServer'
        }
      }
    }
  })
}
