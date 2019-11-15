import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mask, unmask, cpos } from './DateInput'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test.skip('regexp', () => {
  // input value
  console.log('23/12/1'.replace(/^\d{2}\/\d{2}\/\d{2}/m, "asdf"))
  console.log('23/12/21'.replace(/^\d{2}\/\d{2}\/\d{2}/m, "asdf"))
  console.log('23/12/212'.replace(/^\d{2}\/\d{2}\/\d{2}/m, "asdf"))

  //masked value:
  const arr = [
    [1, 2, 3],
    ['a', undefined, 'e'],
    [],
  ]
  arr.forEach(v => console.log('array: ',
    `${v[0]}/${v[1]}/${v[2]}`
  ))

  //masked value:
  const arr2 = [
    undefined,
    1,
    12,
    '010100'
  ]
  arr.forEach(v => console.log('slicer: ',
    `${v.slice(0, 1)}/${v.slice(2, 3)}/${v.slice(3, 4)}`
  ))
})

const maskedUnmaskedValuePairs = [
  { unmasked: '1', masked: '1' },
  { unmasked: '11', masked: '11' },
  { unmasked: '01', masked: '01' },
  { unmasked: '0112', masked: '01.12' },
  { unmasked: '01122', masked: '01.12.2' },
]
it('raw input should be masked', () => {
  maskedUnmaskedValuePairs.forEach(({ masked, unmasked }) =>
    expect(mask(unmasked)).toBe(masked)
  )
})

it('masked input should be unmasked', () => {
  maskedUnmaskedValuePairs.forEach(({ masked, unmasked }) =>
    expect(unmask(masked)).toBe(unmasked)
  )
})