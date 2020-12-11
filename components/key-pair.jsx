import { useState } from 'react'
import { KeyPart } from './key-part'

export function KeyPair({ publicKey, privateKey }) {
  const [showPrivate, setShowPrivate] = useState(false)

  const toggle = () => setShowPrivate(!showPrivate)

  return (
    <div>
      <KeyPart title="your public key" keyPart={publicKey} />
      {!showPrivate && (
        <button onClick={toggle} className="text-black underline">
          show private key
        </button>
      )}
      {!!showPrivate && <KeyPart title="your private key" keyPart={privateKey} />}
    </div>
  )
}
