import { useForm } from 'react-hook-form'
import { InputArea } from './input-area'
import { InputText } from './input-text'
import { Button } from './button'

export function FormEncryptMessage({ onSubmit }) {
  const { handleSubmit, register, errors } = useForm()

  const submit = ({ data, destinationPublicKey }) => onSubmit({ data, destinationPublicKey })

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit(submit)}>
      <InputArea
        label="Message"
        id="input-message"
        name="data"
        ref={register({ required: 'The message is required' })}
        error={errors['data']?.message}
      />

      <InputArea
        label="Destination public key"
        id="input-public-key"
        name="destinationPublicKey"
        ref={register({ required: 'The destination public key is required' })}
        error={errors['destinationPublicKey']?.message}
      />

      <Button>Create secret</Button>
    </form>
  )
}
