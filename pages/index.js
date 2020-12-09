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

const createShareLink = (encrypted, iv, publicKey) =>
  `${location.origin}/secret/${encrypted}$${iv}?sourcePublicKey=${publicKey}`

export default function Home() {
  const { data: keys, isLoading: isLoadingKeys, error: errorKeys } = useQuery(
    '/api/generate',
    generateKeysService
  )
  const [mutate, { data, isLoading, error }] = useMutation(encryptService)

  const handleCopyToClipboard = () => {}

  const handleSubmit = ({ data, destinationPublicKey }) =>
    mutate({ data, destinationPublicKey, selfPrivateKey: keys.privateKey })

  return (
    <Page>
      <Hero />

      <section>
        {!isLoadingKeys && !data && <FormEncryptMessage onSubmit={handleSubmit} />}

        {!isLoading && !!data && (
          <MainBox>
            <div className="flex flex-col pb-6">
              <h3>Secret generated</h3>
              <p className="break-all">
                {createShareLink(data.encryptedMessage, data.iv, keys.publicKey)}
              </p>
            </div>

            <Button onClick={handleCopyToClipboard}>Copy access link</Button>

            <p className="w-full text-center pt-3">Send this link to your friend!</p>
          </MainBox>
        )}

        {isLoadingKeys && <div>loading...</div>}
        {!isLoadingKeys && !!keys && (
          <KeyPair privateKey={keys.privateKey} publicKey={keys.publicKey} />
        )}
      </section>
      <br />
      <Footer />
    </Page>
  )
}
