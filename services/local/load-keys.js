const LOCAL_KEYS = 'shhh_keys'

export default function loadKeysService() {
  const localKeys = localStorage.getItem(LOCAL_KEYS)
  if (localKeys) return Promise.resolve(JSON.parse(localKeys))
  return Promise.reject()
}
