import { build } from "esbuild"
import { polyfillNode } from "esbuild-plugin-polyfill-node"

build({
	bundle: true,
	platform: "browser",
	format: "esm",
	entryPoints: ["main.js"],
	outfile: "build/bundle.mjs",
	plugins: [
		polyfillNode({
			globals: {
				__dirname: false,
				__filename: false,
				buffer: true,
				global: false,
				navigator: false,
				process: false,
			}
		}),
	],
})
