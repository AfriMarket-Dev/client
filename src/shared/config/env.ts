/**
 * Centralized environment variable access
 */
export const ENV = {
	API_URL: import.meta.env.VITE_API_URL || "http://localhost:3000",
	IS_DEV: import.meta.env.DEV,
	IS_PROD: import.meta.env.PROD,
	VERSION: import.meta.env.VITE_APP_VERSION || "0.0.0",
} as const;

export const getApiUrl = () => {
	return `${ENV.API_URL.replace(/\/$/, "")}/api`;
};
