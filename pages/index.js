import { useMutation, useQuery } from 'react-query'

import encryptService from '../services/api/encrypt'
import { FormEncryptMessage } from '../components/form-encrypt-message'
import generateKeysService from '../services/api/generate'
import { Page } from '../components/page'
import { Hero } from '../components/hero'
import { MainBox } from '../components/main-box'
import { Button } from '../components/button'
import { KeyPair } from '../components/key-pair'
import { Footer } from '../components/footer'
import { useEncryptionKeys } from '../hooks/use-encryption-keys'
import { useSecretEncryption } from '../hooks/use-secret-encryption'

const createShareLink = (encrypted, iv, publicKey) =>
  `${location.origin}/secret/${encrypted}$${iv}?sourcePublicKey=${publicKey}`

export default function Home() {
  const { loading: keysLoading, keys, error: keysError, reset } = useEncryptionKeys()
  const { loading: encryptionLoading, data: encryptionData, encrypt } = useSecretEncryption()

  const handleCopyToClipboard = () => {}

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

        <button onClick={reset}>reset keys</button>

        {!encryptionLoading && !!encryptionData && (
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
            </div>

            <Button onClick={handleCopyToClipboard}>Copy access link</Button>

            <p className="w-full text-center pt-3">Send this link to your friend!</p>
          </MainBox>
        )}

        {keysLoading && <div>loading...</div>}
        {!keysLoading && !!keys && (
          <KeyPair privateKey={keys.privateKey} publicKey={keys.publicKey} />
        )}
      </section>
      <br />
      <Footer />
    </Page>
  )
}
