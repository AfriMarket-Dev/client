import pino from "pino";

/**
 * Standardized application logger
 * Clean, structured, and easy to filter in dev tools
 */
export const logger = pino({
	browser: {
		asObject: true,
	},
	level: import.meta.env.DEV ? "debug" : "info",
	base: {
		env: import.meta.env.MODE,
	},
});

export const apiLogger = logger.child({ module: "api" });
export const loaderLogger = logger.child({ module: "loader" });
export const authLogger = logger.child({ module: "auth" });
