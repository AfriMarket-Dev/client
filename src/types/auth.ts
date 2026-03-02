export interface AuthUser {
	id: string;
	email: string;
	name: string;
	role: string;
	needsOnboarding?: boolean;
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
	role: "buyer" | "provider";
}

export interface SessionUser {
	id: string;
	email: string;
	name: string;
	role: string;
	needsOnboarding?: boolean;
}

export interface AuthResponse {
	user: SessionUser;
	token: string;
}
