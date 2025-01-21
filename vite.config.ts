import { partytownVite } from '@builder.io/partytown/utils';
import { sveltekit } from '@sveltejs/kit/vite';
import { join } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

const config = defineConfig({
	plugins: [
		sveltekit(),
		partytownVite({
			dest: join(__dirname, 'static', '~partytown'),
		}),
		visualizer({
			filename: './build-stats.html',
			open: true, // Opens the file in the browser after the build
		}),
	],
	server: {
		port: 8009,
		strictPort: false,
	},
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true, // Removes `debugger` statements
				keep_infinity: true, // Keeps `Infinity` and `NaN`	
			},
			output: {
				comments: false, // Removes all comments from the output
			},
		},
		assetsDir: 'assets',
		rollupOptions: {
			output: {
				entryFileNames: 'assets/[name].[hash].js',
				chunkFileNames: 'assets/[name].[hash].js',
				assetFileNames: 'assets/[name].[hash].[ext]',
			},
		},
	},
	optimizeDeps: {
		include: ['lodash.get', 'lodash.isequal', 'lodash.clonedeep'],
	},
});

export default config;
