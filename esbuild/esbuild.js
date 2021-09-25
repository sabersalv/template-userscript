import esbuild from 'esbuild'
import browserslist from 'browserslist'
import dotenv from 'dotenv'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist'
import svgr from './plugin-svgr.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cmd = process.argv.slice(2)[0]
const isDev = cmd === 'dev'
const isProd = cmd === 'build'
const pkg = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`))

const define = {}
if (isDev) {
  const env = dotenv.config().parsed || {}
  for (const [key, value] of Object.entries(env)) {
    define[key] = JSON.stringify(value)
  }
}

let meta = fs
  .readFileSync(`${__dirname}/../src/meta.ts`)
  .toString()
  .replaceAll(/APP_NAME/g, pkg.name)
  .replaceAll(/DESCRIPTION/g, pkg.description)
  .replaceAll(/VERSION/g, pkg.version)
  .replaceAll(/AUTHOR/g, pkg.author)
for (const [key, value] of Object.entries(define)) {
  meta = meta.replace(key, value)
}
meta = `${meta};`

esbuild
  .build({
    entryPoints: ['src/index.tsx'],
    outfile: `dist/${pkg.name}.user.js`,
    logLevel: 'info',
    bundle: true,
    target: resolveToEsbuildTarget(
      browserslist('last 2 chrome versions, last 2 firefox versions')
    ),
    define,
    watch: isDev,
    minify: isProd,
    sourcemap: isDev && 'inline',
    banner: { js: meta },
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    inject: ['./esbuild/preact-shim.ts'],
    plugins: [
      svgr({
        svgoConfig: {
          plugins: {
            prefixIds: false,
            removeViewBox: false,
            addClassesToSVGElement: {
              classNames: [pkg.name],
            },
          },
        },
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
      }),
    ],
  })
  .catch(() => {
    process.exit(1)
  })
