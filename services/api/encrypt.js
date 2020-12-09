export default function encryptService({ data, destinationPublicKey, selfPrivateKey }) {
  return fetch('/api/encrypt', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      data,
      destinationPublicKey,
      selfPrivateKey
    })
  }).then((response) => response.json())
}
