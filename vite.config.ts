/// <reference types="vitest" />
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		devtools(),
		tailwindcss(),
		tanstackRouter({ target: "react", autoCodeSplitting: true }),
		viteReact({
			// @ts-expect-error - babel might be missing from types in this version
			babel: {
				plugins: [["babel-plugin-react-compiler", { target: "19" }]],
			},
		}),
	],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: "./src/test/setup.ts",
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
	server: {
		port: 4000,
	},
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						if (id.includes("react") || id.includes("react-dom")) {
							return "vendor-react";
						}
						if (
							id.includes("@reduxjs") ||
							id.includes("react-redux") ||
							id.includes("redux-persist")
						) {
							return "vendor-redux";
						}
						if (id.includes("@tanstack/react-router")) {
							return "vendor-router";
						}
						if (id.includes("recharts")) {
							return "vendor-charts";
						}
						if (
							id.includes("lucide-react") ||
							id.includes("@remixicon/react")
						) {
							return "vendor-ui";
						}
					}
				},
			},
		},
	},
});
