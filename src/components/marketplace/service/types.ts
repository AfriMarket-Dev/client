export interface Service {
	id: string;
	name: string;
	description: string;
	price: string | number;
	type: string;
	isFeatured?: boolean;
	company?: {
		id: string;
		name: string;
		email?: string;
		phone?: string;
	};
	provider: {
		fullName: string;
		role: string;
		rating: string | number;
		experience: string;
		id?: string;
	};
	[key: string]: any;
}
