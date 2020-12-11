import { useRouter } from 'next/router'
import { Page } from '../../components/page'
import { Hero } from '../../components/hero'
import { MainBox } from '../../components/main-box'
import { Button } from '../../components/button'
import { KeyPair } from '../../components/key-pair'
import { useEncryptionKeys } from '../../hooks/use-encryption-keys'
import { useSecretDecryption } from '../../hooks/use-secret-decryption'

export default function SecretPage() {
  const { loading: keysLoading, keys, error: keysError, reset } = useEncryptionKeys()
  const { loading: decryptionLoading, data, error: decryptError, decrypt } = useSecretDecryption()

  const router = useRouter()
  const { cipher_content, sourcePublicKey } = router.query
  const [encryptedMessage] = cipher_content ? cipher_content.split('$') : []

  const handleReveal = () => {
    const [encryptedMessage, iv] = cipher_content.split('$')
    decrypt({
      data: encryptedMessage,
      destinationPrivateKey: keys.privateKey,
      sourcePublicKey: sourcePublicKey,
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

        {!decryptionLoading && !!data && (
          <MainBox>
            <p className="break-words">{data}</p>
          </MainBox>
        )}

        {!keysLoading && !!keys && (
          <KeyPair publicKey={keys.publicKey} privateKey={keys.privateKey} />
        )}
      </section>
    </Page>
  )
}
