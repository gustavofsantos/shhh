import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import user from '@testing-library/user-event'
import { FormEncryptMessage } from '../form-encrypt-message'

describe(FormEncryptMessage.name, () => {
  const message = 'this is the secret'
  const destinationPubKey = 'abc123'

  test('should submit when fill the message and the destination public key', async () => {
    const onSubmit = jest.fn()
    render(<FormEncryptMessage onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/message/i), message)
    await user.type(screen.getByLabelText(/destination public key/i), destinationPubKey)

    user.click(screen.getByText(/create/i))

    await waitFor(() =>
      expect(onSubmit).toBeCalledWith({
        data: message,
        destinationPublicKey: destinationPubKey
      })
    )
  })

  test('should display validation error when submit without typing the message', async () => {
    const onSubmit = jest.fn()
    render(<FormEncryptMessage onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/destination public key/i), destinationPubKey)

    user.click(screen.getByText(/create/i))

    await waitFor(() => expect(screen.getByText(/message is required/i)).toBeInTheDocument())
    expect(onSubmit).not.toBeCalled()
  })

  test('should display validation error when submit without typing the destination public key', async () => {
    const onSubmit = jest.fn()
    render(<FormEncryptMessage onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/message/i), message)

    user.click(screen.getByText(/create/i))

    await waitFor(() =>
      expect(screen.getByText(/destination public key is required/i)).toBeInTheDocument()
    )
    expect(onSubmit).not.toBeCalled()
  })

  test('should display both validation errors when submit without typing anything', async () => {
    const onSubmit = jest.fn()
    render(<FormEncryptMessage onSubmit={onSubmit} />)

    user.click(screen.getByText(/create/i))

    await waitFor(() => expect(screen.getByText(/message is required/i)).toBeInTheDocument())
    await waitFor(() =>
      expect(screen.getByText(/destination public key is required/i)).toBeInTheDocument()
    )
    expect(onSubmit).not.toBeCalled()
  })
})
