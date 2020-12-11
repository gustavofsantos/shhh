import { forwardRef } from 'react'
import { WarningIcon } from './icons/warning-icon'

export const InputArea = forwardRef((props, ref) => (
  <div className="flex flex-col w-full pb-6 pt-2">
    <label
      className="pl-2 pb-1 text-sm text-black font-light uppercase dark:text-gray-100"
      htmlFor={props.id}
    >
      {props.label}
    </label>
    <textarea
      className="p-2 h-full max-h-20 text-gray-900 outline-none bg-gray-100 dark:bg-gray-200"
      id={props.id}
      name={props.name}
      ref={ref}
    />
    {!!props.error && (
      <div className="flex justify-start align-center p-2 text-black font-light text-sm">
        <div className="w-5 h-5">
          <WarningIcon />
        </div>{' '}
        {props.error}
      </div>
    )}
  </div>
))

InputArea.displayName = 'InputArea'
