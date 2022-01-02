import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'
import pkg from './package.json'

const extensions = ['.ts']

const baseConfig = {
	input: './src/index.ts',
	external: Object.keys(pkg.peerDependencies),
	plugins: [
		commonjs(),
		nodeResolve({
			extensions,
			preferBuiltins: true,
		}),
		typescript({ tsconfig: './tsconfig.json' }),
		babel({
			extensions,
			exclude: 'node_modules/**',
			babelHelpers: 'runtime',
		}),
		sizeSnapshot(),
		terser(),
	],
}

export default [
	{
		...baseConfig,
		output: { file: pkg.module, format: 'esm' },
	},
	{
		...baseConfig,
		output: { file: pkg.main, format: 'cjs' },
	},
]
