export default function generateKeysService() {
  return fetch('/api/generate').then((response) => response.json())
}
