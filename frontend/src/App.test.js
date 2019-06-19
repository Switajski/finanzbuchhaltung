import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('regexp', () => {
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
