import './meta'
import './polyfill'

import { render } from 'react-dom'
import { useState } from 'react'

const Button = () => {
  const [counter, setCounter] = useState(0)
  return (
    <button onClick={() => setCounter(counter + 1)}>Click me! {counter}</button>
  )
}

const app = document.createElement('div')
document.body.appendChild(app)
render(<Button />, app)
