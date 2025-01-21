import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		// Inline all styles as <link rel="stylesheet"> isn't allowed
		inlineStyleThreshold: Infinity,
	},
	preprocess: vitePreprocess({
		postcss: true, // Enable PostCSS
	}),
};

export default config;
