import { CheckIcon } from './icons/check-icon'
import * as CheckList from './checklist'

export function Hero() {
  return (
    <section className="flex flex-col justify-center items-center w-full pb-8 pt-12">
      <h1 className="text-6xl font-extrabold uppercase pb-2 italic text-center text-black dark:text-red-50">
        Shhh
      </h1>
      <p className="mb-6 text-center text-red-900 max-w-md dark:text-red-100">
        Share secrets securely using the latest technology in cryptography.
      </p>

      <CheckList.CheckList>
        <CheckList.CheckItem>
          <span>Once the secret is encrypted, only the destination can decrypt</span>
        </CheckList.CheckItem>
        <CheckList.CheckItem>
          <span>No data is stored</span>
        </CheckList.CheckItem>
        <CheckList.CheckItem>
          <span>The encrypted message lives in the shared url</span>
        </CheckList.CheckItem>
      </CheckList.CheckList>
    </section>
  )
}
