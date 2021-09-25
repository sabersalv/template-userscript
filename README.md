# Hello

> Click "Use this template" above

## Getting Started

Typescript + Esbuild + Preact/JSX + Emotion + SVG loader + Prettier + Eslint + fetch polyfill


```jsx
// Build UI
import { render, useState } from 'preact'
function Button() {
  const [conuter, setCounter] = useState(0)
  return <button onClick={() => setCounter(count + 1)}>Increase {counter}</button>
}
render(<Button />, document.body)

// Style
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
