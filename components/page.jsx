export function Page({ children }) {
  return (
    <article className="flex flex-col w-full p-6 bg-red-500 dark:bg-red-900 md:max-w-md lg:max-w-xl">
      {children}
    </article>
  )
}
