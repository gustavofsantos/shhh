export default function storeKeysService(keys) {
  localStorage.setItem('shhh_keys', JSON.stringify(keys))
  return Promise.resolve()
}
