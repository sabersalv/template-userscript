# Hello

> Click "Use this template" above

## Getting Started

Typescript + Esbuild + Preact/JSX + React Hooks + Emotion + SVG loader + Prettier + Eslint + fetch polyfill

```jsx
// Build UI
import { render } from 'preact'
import { useState  } from 'preact/hooks'
function Button() {
  const [conuter, setCounter] = useState(0)
  return <button onClick={() => setCounter(counter + 1)}>Click me! {counter}</button>
}
render(<Button />, document.body)

// insertBefore
const target = document.querySelector('#target')
const div = document.createElement('div')
render(<Button />, div)
target.parentNode.insertBefore(div.firstChild, target)

// Style
// You can replace Emotion with any CSS-in-JS, CSS Modules or Plain CSS file
import { css } from '@emotion/css'
const buttonStyle = css`
  color: blue;
  &:hover {
    color: red;
  }
`
<button className={buttonStyle}>Hello</button>

// Import svg file
import HomeIcon from './home.svg'
render(<HomeIcon />, document.body)

// Fetch polyfill
const res = await fetch(url)
const body = await res.json()
```

## Development

```shell
npm install -g npm-check-updates && ncu -u    # Upgrade deps
yarn                # Install deps
yarn start          # Start deployment, watch mode
yarn build          # build for production
```
