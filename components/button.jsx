export function Button({ children, ...props }) {
  return (
    <button
      className="bg-black text-white font-light uppercase text-lg pt-3 pb-3 shadow-lg"
      {...props}
    >
      {children}
    </button>
  )
}
