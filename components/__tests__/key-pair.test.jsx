import React from 'react'
import { render, screen } from '@testing-library/react'
import user from '@testing-library/user-event'
import { KeyPair } from '../key-pair'

describe(KeyPair.name, () => {
  const privateKey = 'the super secret private key'
  const publicKey = 'the super secret public key'

  test('should show only the public key by default', () => {
    render(<KeyPair privateKey={privateKey} publicKey={publicKey} />)

    expect(screen.getByText(publicKey)).toBeInTheDocument()
    expect(screen.queryByText(privateKey)).toBeNull()
    expect(screen.getByText(/show/i)).toBeInTheDocument()
  })

  test('should show the private key after click in the button', () => {
    render(<KeyPair privateKey={privateKey} publicKey={publicKey} />)

    user.click(screen.getByText(/show/i))

    expect(screen.getByText(privateKey)).toBeInTheDocument()
    expect(screen.queryByText(/show/i)).toBeNull()
  })
})
