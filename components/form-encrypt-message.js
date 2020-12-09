import { useForm } from 'react-hook-form'
import { InputArea } from './input-area'
import { InputText } from './input-text'
import { MainBox } from './main-box'
import { Button } from './button'

export function FormEncryptMessage({ onSubmit }) {
  const { handleSubmit, register, errors } = useForm()

  const submit = ({ data, destinationPublicKey }) => onSubmit({ data, destinationPublicKey })

  return (
    <MainBox>
      <form className="flex flex-col w-full" onSubmit={handleSubmit(submit)}>
        <InputArea label="Message" id="input-message" name="data" ref={register} />

        <InputArea
          label="Destination public key"
          id="input-public-key"
          name="destinationPublicKey"
          ref={register}
        />

        <Button>Create secret</Button>
      </form>
    </MainBox>
  )
}
