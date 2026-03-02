export interface CompanyRef {
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
	joinedAt?: string;
	ownerId?: string;
	createdAt?: string;
	updatedAt?: string;
}

