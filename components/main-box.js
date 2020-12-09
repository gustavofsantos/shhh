export function MainBox({ children }) {
  return (
    <section className="flex flex-col w-full p-6 rounded-xl mt-8 mb-10 bg-gradient-to-br from-blue-400 to-indigo-500 dark:from-blue-500 dark:to-indigo-600">
      {children}
    </section>
  )
}
