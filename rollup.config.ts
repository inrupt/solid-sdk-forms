import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import requireContext from 'rollup-plugin-require-context'
import babel from 'rollup-plugin-babel'
import alias from 'rollup-plugin-alias';

const pkg = require('./package.json')

const libraryName = 'solid-forms'

export default {
  input: `src/${libraryName}.ts`,
  external: ['@solid/query-ldflex', '@shexjs/parser', '@shexjs/core', 'moment'],
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: false },
    { file: pkg.module, format: 'es', sourcemap: false },
  ],
  context: 'null',
  moduleContext: 'null',
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  watch: {
    include: 'src/**',
  },
  plugins: [
    requireContext(),
    globals(),
    builtins(),
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true, objectHashIgnoreUnknownHack: true, clean: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      // exclude: './node_modules/**',
      include: 'node_modules/**', 
      namedExports: {
      'node_modules/@solid/query-ldflex/dist/solid-query-ldflex.bundle.js': [ 'data' ],
      'node_modules/@shexjs/parser/shex-parser.js': ['shexParser'],
      'node_modules/@shexjs/core/shex-core.js': ['shexCore']
      }
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve({ browser: true, jsnext: true, main: true, modulesOnly: true }),
    // Resolve source maps to the original source
    sourceMaps(),
    babel(),
    alias({
      resolve: ['.ts'],
      entries:[
        { find:'@alias', replacement: 'src/utils' },
        { find:'@constants', replacement: 'src/constants' },
        { find:'@interfaces', replacement: 'src/interfaces' },
        { find:'@schemas', replacement: 'src/schemas' }
      ]
    })
  ],
}