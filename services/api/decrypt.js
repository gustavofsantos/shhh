export default function decryptService({ data, destinationPrivateKey, sourcePublicKey, iv }) {
  return fetch('/api/decrypt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data,
      destinationPrivateKey,
      sourcePublicKey,
      iv
    })
  }).then((response) => response.json())
}
