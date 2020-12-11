import { KeyPair } from './key-pair'

export function Footer() {
  return (
    <footer className="flex flex-col w-full pt-6 pb-12 bg-black">
      <a
        className="text-white font-light underline text-center cursor-pointer"
        href="https://github.com/gustavofsantos/shhh"
        target="_blank"
        rel="noopener noreferrer"
      >
        Inspect the source code
      </a>
    </footer>
  )
}
