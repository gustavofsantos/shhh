import { useState } from 'react'
import { KeyPart } from './key-part'

export function KeyPair({ publicKey, privateKey }) {
  const [showPrivate, setShowPrivate] = useState(false)

  const toggle = () => setShowPrivate(!showPrivate)

  return (
    <div>
      <KeyPart title="your public key" keyPart={publicKey} />
      {!showPrivate && (
        <button
          onClick={toggle}
          className="rounded-3xl p-2 pt-1 pb-1 border border-yellow-700 text-yellow-700 dark:border-yellow-500 dark:text-yellow-500"
        >
          show private key
        </button>
      )}
      {!!showPrivate && <KeyPart title="your private key" keyPart={privateKey} />}
    </div>
  )
}
