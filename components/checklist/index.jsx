import { CheckIcon } from '../icons/check-icon'

export const CheckList = ({ children }) => <ul className="bg-black mt-6 mb-6 p-6">{children}</ul>

export const CheckItem = ({ children }) => (
  <li className="flex w-full fill-current text-white font-light">
    <CheckIcon />
    <div className="pr-2" />
    <div className="flex w-full">{children}</div>
  </li>
)
