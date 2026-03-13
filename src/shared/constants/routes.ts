/**
 * Centralized route definitions for type-safety and reusability
 */
export const ROUTES = {
	HOME: "/",
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
		AUCTIONS: {
			INDEX: "/dashboard/auctions",
			NEW: "/dashboard/auctions/new",
		},
		LISTINGS: {
			INDEX: "/dashboard/listings",
			NEW: "/dashboard/listings/new",
			EDIT: (id: string) => `/dashboard/listings/${id}/edit` as const,
		},
	},
	ADMIN: {
		INDEX: "/admin",
		AUCTIONS: "/admin/auctions",
		SUPPLIERS: {
			INDEX: "/admin/providers",
			NEW: "/admin/providers/new",
			DETAILS: (id: string) => `/admin/providers/${id}` as const,
			EDIT: (id: string) => `/admin/providers/${id}/edit` as const,
		},
		PRODUCTS: "/admin/products",
		SERVICES: "/admin/services",
		CATEGORIES: "/admin/categories",
		BUYERS: "/admin/buyers",
		ASSIGNMENTS: "/admin/assignments",
		PROFILE: "/admin/profile",
	},
	PUBLIC: {
		PRODUCTS: "/products",
		SERVICES: "/services",
		SUPPLIERS: "/providers",
		AUCTIONS: "/auctions",
		CATEGORIES: "/categories",
		PRODUCT: (id: string) => `/products/${id}` as const,
		SERVICE: (id: string) => `/services/${id}` as const,
		SUPPLIER: (id: string) => `/providers/${id}` as const,
	},
} as const;
