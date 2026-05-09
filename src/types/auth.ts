export interface AuthUser {
	id: string;
	email: string;
	name: string;
	role: "user" | "provider" | "agent" | "admin";
	phoneNumber?: string;
	image?: string;
	avatar?: string; // Legacy support
	companyId?: string;
	needsOnboarding: boolean;
	company?: { id: string; name: string };
}

export interface AuthState {
	isAuthenticated: boolean;
	user: AuthUser | null;
	token: string | null;
	loading: boolean;
	error: string | null;
}

export interface SignInRequest {
	email: string;
	password?: string;
}

export interface SignUpRequest {
	name: string;
	email: string;
	password?: string;
	role: "user" | "provider" | "agent";
}

export interface SessionUser extends AuthUser {}

export interface AuthResponse {
	user: SessionUser;
	token: string;
}
