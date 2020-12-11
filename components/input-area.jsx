import { forwardRef } from 'react'

export const InputArea = forwardRef((props, ref) => (
  <div className="flex flex-col w-full pb-6 pt-2">
    <label className="pl-2 pb-1 text-gray-700 dark:text-gray-100" htmlFor={props.id}>
      {props.label}
    </label>
    <textarea
      className="p-2 rounded-xl text-gray-900 outline-none bg-gray-100 dark:bg-gray-200"
      id={props.id}
      name={props.name}
      ref={ref}
    />
    {!!props.error && (<span>{props.error}</span>)}
  </div>
))

InputArea.displayName = 'InputArea'
