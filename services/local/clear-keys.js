export default function clearKeysService() {
  localStorage.removeItem('shhh_keys')
  return Promise.resolve()
}
