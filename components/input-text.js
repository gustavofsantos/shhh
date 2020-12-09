import { forwardRef } from 'react'

export const InputText = forwardRef((props, ref) => (
  <div className="flex flex-col w-full pb-6 pt-2">
    <label className="pl-2 pb-1" htmlFor={props.id}>
      {props.label}
    </label>
    <input className="p-2 rounded-xl outline-none" id={props.id} name={props.name} ref={ref} />
  </div>
))

InputText.displayName = 'InputText'
