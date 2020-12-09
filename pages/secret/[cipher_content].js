import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import decryptService from '../../services/api/decrypt'
import generateKeysService from '../../services/api/generate'
import { Page } from '../../components/page'
import { Hero } from '../../components/hero'
import { MainBox } from '../../components/main-box'
import { Button } from '../../components/button'
import { KeyPair } from '../../components/key-pair'

export default function SecretPage() {
  const { data: keys, isLoading: isLoadingKeys, error: errorKeys } = useQuery(
    '/api/generate',
    generateKeysService
  )

  const router = useRouter()
  const [mutate, { data, isLoading, error }] = useMutation(decryptService)
  const { cipher_content } = router.query

  const [encryptedMessage] = cipher_content ? cipher_content.split('$') : []

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
          <KeyPair publicKey={keys.publicKey} privateKey={keys.privateKey} />
        )}
      </section>
    </Page>
  )
}
