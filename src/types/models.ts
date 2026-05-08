export interface CompanyCategoryRef {
	id: string;
	name: string;
	description?: string;
}

export type ProviderType = 'MANUFACTURER_RWANDA' | 'SUPPLIER_WHOLESALER' | 'SUPPLIER_RETAILER' | 'SERVICE_PROVIDER';

/**
 * Standardized Provider Entity
 * Backend: Company
 */
export interface Provider {
	id: string;
	name: string;
	slug: string;
	logoUrl?: string;
	description: string;
	type: ProviderType;
	
	// Location Data
	province: string;
	district: string;
	sector: string;
	cell?: string;
	village?: string;

	// Contact & Interaction Info
	phoneNumber: string;
	whatsappNumber?: string;
	email: string;
	
	// API Aliases (Legacy support for existing components)
	phone?: string;
	isActive: boolean;
	isVerified: boolean;
	visits: number;
	category: CompanyCategoryRef;
	followersCount?: number;

	// Social Proof
	averageRating: number;
	reviewCount: number;
	capabilities: string[];
	
	createdAt?: string;
	updatedAt?: string;
	ownerId?: string;
}

// Backward compatibility aliases
export type Company = Provider;

export interface ProductCategoryRef {
	id: string;
	name: string;
	description?: string;
}

export interface ProductVariant {
	id: string;
	name: string;
	sku?: string;
	price: number;
	stock: number;
	discount?: number;
	unit?: string;
	images?: string[];
}

export interface Product {
	id: string;
	name: string;
	description?: string;
	priceType: "FIXED" | "NEGOTIABLE" | "STARTS_AT";
	isActive: boolean;
	isFeatured?: boolean;
	views: number;
	category: ProductCategoryRef;
	company: ProviderRef;
	price?: number;
	stock?: number;
	unit?: string;
	images?: string[];
	specifications?: Record<string, string>;
	variants?: ProductVariant[];
	createdAt?: string;
	updatedAt?: string;
}

export interface ProviderRef {
	id: string;
	name: string;
	slug?: string;
	district?: string;
	isVerified?: boolean;
	type?: string;
	email?: string;
	phone?: string;
	address?: string;
	description?: string;
	logo?: string;
	rating?: number;
	followersCount?: number;
	country?: string;
	joinedAt?: string;
	ownerId?: string;
	createdAt?: string;
	updatedAt?: string;
}

// Backward compatibility alias
export type CompanyRef = ProviderRef;

export interface ProductCategory {
	id: string;
	name: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface Service {
	id: string;
	name: string;
	description?: string;
	priceType: "FIXED" | "NEGOTIABLE" | "STARTS_AT";
	price?: number;
	duration?: string;
	discount?: number;
	isActive: boolean;
	isFeatured?: boolean;
	views?: number;
	category: ProductCategoryRef;
	company: ProviderRef;
	images?: string[];
	specifications?: Record<string, string>;
	totalRequests?: number;
	createdAt?: string;
	updatedAt?: string;
}

export type AuctionStatus =
	| "PENDING"
	| "APPROVED"
	| "REJECTED"
	| "ACTIVE"
	| "ENDED";

export interface Auction {
	id: string;
	title: string;
	description?: string;
	startingPrice: number;
	images?: string[];
	specifications?: Record<string, string>;
	status: AuctionStatus;
	startDate: string;
	endDate: string;
	views?: number;
	bidsCount?: number;
	company: ProviderRef;
	createdAt?: string;
	updatedAt?: string;
}

export interface Review {
	id: string;
	rating: number;
	comment: string;
	userId: string;
	user?: { id: string; name: string; email: string };
	productId?: string;
	companyId?: string;
	createdAt: string;
}

export interface Message {
	id: string;
	senderId: string;
	receiverId: string;
	content: string;
	createdAt: string;
	sender: { id: string; name?: string; email: string };
	receiver: { id: string; name?: string; email: string };
	product?: { id: string; name: string };
	service?: { id: string; name: string };
	auction?: { id: string; title: string };
	isRead: boolean;
}

export interface ConversationPartner {
	partner: { id: string; name?: string; email: string; image?: string };
	lastMessage: string;
	lastMessageAt: string;
	unreadCount: number;
}

export interface ServiceCategory {
	id: string;
	name: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface CompanyCategory {
	id: string;
	name: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface MarketplaceStats {
	verifiedProviders: number;
	verifiedSuppliers?: number; // Backward compatibility
	productsListed: number;
	districtsCovered: number;
	activeContractors: number;
}

export interface InteractionType {
	type: 'VIEW' | 'WHATSAPP_CLICK' | 'CALL_CLICK' | 'EMAIL_CLICK' | 'SHARE';
}

export interface LogInteractionPayload {
	type: 'VIEW' | 'WHATSAPP_CLICK' | 'CALL_CLICK' | 'EMAIL_CLICK' | 'SHARE';
	serviceId?: string;
	productId?: string;
	companyId?: string;
	metadata?: Record<string, unknown>;
}

export interface UserProfile {
	id: string;
	name: string;
	email: string;
	image?: string;
	role: string;
	emailVerified?: boolean;
	phoneNumber?: string;
	company?: { id: string; name: string };
	needsOnboarding?: boolean;
	createdAt?: string;
}

export interface AdminDashboardStats {
	users: {
		total: number;
		active: number;
		byRole: Record<string, number>;
	};
	companies: {
		total: number;
		active: number;
		verified: number;
		byCategory: { name: string; count: number }[];
	};
	products: {
		total: number;
		active: number;
	};
	services: {
		total: number;
		active: number;
	};
	reviews: {
		total: number;
		/**
		 * Average rating string formatted to 2 decimal places on the backend.
		 */
		averageRating: string;
	};
}

export interface ProviderCompanyStats {
	id: string;
	name: string;
	overview: {
		visits: number;
		reviews: number;
		rating: number;
	};
	interactions: {
		views: number;
		whatsappClicks: number;
		callClicks: number;
		emailClicks: number;
		shares: number;
	};
	inventory: {
		products: {
			count: number;
			views: number;
		};
		services: {
			count: number;
			views: number;
		};
	};
}

export interface ProviderStats {
	overview: {
		totalViews: number;
		totalReviews: number;
		averageRating: number;
		companiesCount: number;
		totalInteractions: number;
	};
	companies: ProviderCompanyStats[];
}
