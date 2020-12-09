const LOCAL_KEYS = 'shhh_keys'

export default function generateKeysService() {
  const localKeys = localStorage.getItem(LOCAL_KEYS)
  if (localKeys) return Promise.resolve(JSON.parse(localKeys))

  return fetch('/api/generate')
    .then((response) => response.json())
    .then((body) => {
      localStorage.setItem(LOCAL_KEYS, JSON.stringify(body))
      return body
    })
}
