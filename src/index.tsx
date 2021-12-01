import './meta'
import './polyfill'

import { render } from 'preact'
import { useState } from 'preact/hooks'

const Button = () => {
  const [counter, setCounter] = useState(0)
  return (
    <button onClick={() => setCounter(counter + 1)}>Click me! {counter}</button>
  )
}

render(<Button />, document.body)
