export function copyToClipboard(ref) {
  ref.current.select()
  ref.current.setSelectionRange(0, 99999)
  document.execCommand('copy')
}
