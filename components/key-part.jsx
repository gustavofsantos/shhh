export function KeyPart({ title, keyPart }) {
  return (
    <div className="flex flex-col w-full pb-3">
      <span className="uppercase font-light text-sm text-black dark:text-red-100">{title}</span>
      <code className="break-all text-sm text-black dark:text-red-50">{keyPart}</code>
    </div>
  )
}
