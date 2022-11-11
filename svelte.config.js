import mdsvexConfig from './mdsvex.config.js'
import adapter from '@sveltejs/adapter-auto'
import preprocess from 'svelte-preprocess'
import { mdsvex } from 'mdsvex'
import 'dotenv/config'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		preprocess({
			postcss: true,
		}),
		mdsvex(mdsvexConfig),
	],

	kit: {
		adapter: adapter(),
		prerender: {
			enabled: false, // SSR only for security
		},
		alias: {
			$package: 'src/package',
		},
	},

	package: {
		source: 'src/package', // Library directory
		dir: 'dist', // Output directory
		exports: (file) => file === 'index.ts', // Only export index.ts
	},

	vitePlugin: {
		experimental: {
			// https://github.com/sveltejs/vite-plugin-svelte/blob/main/docs/config.md#inspector
			inspector: {
				toggleButtonPos: 'bottom-left',
				toggleKeyCombo: 'meta-shift',
				showToggleButton: 'active',
				holdMode: true,
			},
		},
	},
}

export default config
