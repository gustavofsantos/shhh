export function Page({ children }) {
  return (
    <article className="w-full h-full p-6 bg-gray-100 dark:bg-gray-900 md:max-w-lg lg:max-w-lg xl:max-w-xl">
      {children}
    </article>
  )
}
