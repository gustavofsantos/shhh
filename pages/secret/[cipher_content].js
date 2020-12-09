import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import decryptService from '../../services/api/decrypt'
import generateKeysService from '../../services/api/generate'
import { Page } from '../../components/page'
import { Hero } from '../../components/hero'
import { KeyPart } from '../../components/key-part'
import { MainBox } from '../../components/main-box'
import { Button } from '../../components/button'

export default function SecretPage() {
  const [showPrivate, setShowPrivate] = useState(false)
  const { data: keys, isLoading: isLoadingKeys, error: errorKeys } = useQuery(
    '/api/generate',
    generateKeysService
  )

  const router = useRouter()
  const [mutate, { data, isLoading, error }] = useMutation(decryptService)
  const { cipher_content } = router.query

  const [encryptedMessage, iv] = cipher_content ? cipher_content.split('$') : []

  console.log({ cipher_content, data })

  const handleReveal = () => {
    const [encryptedMessage, iv] = cipher_content.split('$')
    mutate({
      data: encryptedMessage,
      destinationPrivateKey: keys.privateKey,
      sourcePublicKey: keys.publicKey,
      iv
    })
  }

  return (
    <Page>
      <Hero />
      <section>
        {!!cipher_content && !data && (
          <MainBox>
            <p className="break-all mb-8">{encryptedMessage} </p>

            <Button onClick={handleReveal}>Reveal</Button>
          </MainBox>
        )}

        {!isLoading && !!data && (
          <MainBox>
            <p className="break-words">{data.decryptedMessage}</p>
          </MainBox>
        )}

        {!isLoadingKeys && !!keys && (
          <section>
            <KeyPart title="Your public key" keyPart={keys.publicKey} />
            {!showPrivate && <button onClick={() => setShowPrivate(true)}>show private key</button>}
            {showPrivate && <KeyPart title="Your private key" keyPart={keys.privateKey} />}
          </section>
        )}
      </section>
    </Page>
  )
}
