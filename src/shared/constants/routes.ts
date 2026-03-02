/**
 * Centralized route definitions for type-safety and reusability
 */
export const ROUTES = {
	HOME: "/",
	MARKETPLACE: "/marketplace",
	ABOUT: "/about",
	HELP: "/help",
	AUTH: {
		SIGNIN: "/auth/signin",
		SIGNUP: "/auth/signup",
		VERIFY_EMAIL: "/auth/verify-email",
	},
	PROTECTED: {
		PROFILE: "/profile",
		MESSAGES: "/messages",
		WISHLIST: "/wishlist",
		ONBOARDING: "/onboarding",
	},
	DASHBOARD: {
		INDEX: "/dashboard",
		LISTINGS: {
			INDEX: "/dashboard/listings",
			NEW: "/dashboard/listings/new",
			EDIT: (id: string) => `/dashboard/listings/${id}/edit` as const,
		},
	},
	ADMIN: {
		INDEX: "/admin",
		SUPPLIERS: {
			INDEX: "/admin/suppliers",
			NEW: "/admin/suppliers/new",
			DETAILS: (id: string) => `/admin/suppliers/${id}` as const,
			EDIT: (id: string) => `/admin/suppliers/${id}/edit` as const,
		},
		PRODUCTS: "/admin/products",
		SERVICES: "/admin/services",
		CATEGORIES: "/admin/categories",
		CUSTOMERS: "/admin/customers",
		ASSIGNMENTS: "/admin/assignments",
		PROFILE: "/admin/profile",
	},
	PUBLIC: {
		PRODUCTS: "/products",
		SERVICES: "/services",
		SUPPLIERS: "/suppliers",
		PRODUCT: (id: string) => `/products/${id}` as const,
		SERVICE: (id: string) => `/services/${id}` as const,
		SUPPLIER: (id: string) => `/suppliers/${id}` as const,
	},
} as const;
