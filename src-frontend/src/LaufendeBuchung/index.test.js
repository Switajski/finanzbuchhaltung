import React from 'react'
import ReactDOM from 'react-dom'
import LaufendeBuchung from '.'

test('renders LaufendeBuchung', () => {
    const div = document.createElement('div')
    ReactDOM.render(<LaufendeBuchung />, div)
    expect(div.querySelector('table')).toHaveAttribute('table', 'tr')
})