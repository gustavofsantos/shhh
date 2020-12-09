export function KeyPart({ title, keyPart }) {
  return (
    <div className="flex flex-col w-full pb-3">
      <span className="uppercase font-light text-gray-600 dark:text-gray-400">{title}</span>
      <p className="break-all text-gray-900 dark:text-gray-300">{keyPart}</p>
    </div>
  )
}
