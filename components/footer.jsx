import Link from 'next/link'

export function Footer() {
  return (
    <footer className="pt-12 pb-24">
      <h2 className="text-gray-900 dark:text-gray-300">Shhh. Share secrets secretly</h2>
      <a
        className="text-blue-500 underline cursor-pointer"
        href="https://github.com/gustavofsantos/shhh"
        target="_blank"
        rel="noopener noreferrer"
      >
        Inspect the source code
      </a>
    </footer>
  )
}
