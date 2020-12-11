import { useState, useRef } from 'react'

import { FormEncryptMessage } from '../components/form-encrypt-message'
import { Page } from '../components/page'
import { Hero } from '../components/hero'
import { MainBox } from '../components/main-box'
import { Button } from '../components/button'
import { KeyPair } from '../components/key-pair'
import { useEncryptionKeys } from '../hooks/use-encryption-keys'
import { useSecretEncryption } from '../hooks/use-secret-encryption'
import { copyToClipboard } from '../lib/copy-to-clipboard'

const createShareLink = (encrypted, iv, publicKey) =>
  `${location.origin}/secret/${encrypted}$${iv}?sourcePublicKey=${publicKey}`

export default function Home() {
  const [copied, setCopied] = useState(false)
  const linkInputRef = useRef()
  const { loading: keysLoading, keys, error: keysError, reset } = useEncryptionKeys()
  const { loading: encryptionLoading, data: encryptionData, encrypt } = useSecretEncryption()

  const handleCopyToClipboard = () => {
    copyToClipboard(linkInputRef)
    setCopied(true)
  }

  const handleSubmit = ({ data, destinationPublicKey }) =>
    encrypt({
      message: data,
      destinationPublicKey,
      selfPrivateKey: keys.privateKey
    })

  return (
    <Page>
      <Hero />

      <section>
        {!keysLoading && !encryptionData && (
          <MainBox>
            <FormEncryptMessage onSubmit={handleSubmit} />
          </MainBox>
        )}

        <div className="flex flex-row-reverse">
          <button className="mb-4 underline" onClick={reset}>
            regenerate keys
          </button>
        </div>

        {!encryptionLoading && !!encryptionData && !!keys && (
          <MainBox>
            <div className="flex flex-col pb-6">
              <h3>Secret generated</h3>
              <p className="break-all">
                {createShareLink(
                  encryptionData.encryptedMessage,
                  encryptionData.encryptionIv,
                  keys.publicKey
                )}
              </p>
              <input
                className="opacity-0 h-0"
                value={createShareLink(
                  encryptionData.encryptedMessage,
                  encryptionData.encryptionIv,
                  keys.publicKey
                )}
                ref={linkInputRef}
              />
            </div>

            <Button onClick={handleCopyToClipboard}>
              {copied ? 'Copied!' : 'Copy access link'}
            </Button>

            <p className="w-full text-center pt-3">Copy and send this link!</p>
          </MainBox>
        )}

        {keysLoading && <div>loading...</div>}
        {!keysLoading && !!keys && (
          <KeyPair privateKey={keys.privateKey} publicKey={keys.publicKey} />
        )}
      </section>
    </Page>
  )
}
