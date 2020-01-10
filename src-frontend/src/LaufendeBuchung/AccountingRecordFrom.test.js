import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import AccountingRecordForm from './AccountingRecordForm'

jest.mock('../useUrlForRead')

test('shows loading indicator', () => {
  const { getByText } = render(<AccountingRecordForm />)
  const input = getByText('laedt...')

  expect(input).toBeDefined()
})

test('has date in form', () => {
  const {getByLabelText} = render(<AccountingRecordForm />)
  const input = getByLabelText('Datum')

  console.log(input)
  expect(input).toHaveAttribute('type', 'date')
})
