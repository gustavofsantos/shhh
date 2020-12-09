export default function decryptService({ data, destinationPrivateKey, sourcePublicKey }) {
  return fetch('/api/decrypt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data,
      destinationPrivateKey,
      sourcePublicKey
    })
  }).then((response) => response.json())
}
