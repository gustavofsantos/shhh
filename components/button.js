export function Button({ children, ...props }) {
  return (
    <button
      className="bg-gray-900 text-white text-lg font-bold rounded-md shadow-md pt-3 pb-3"
      {...props}
    >
      {children}
    </button>
  )
}
