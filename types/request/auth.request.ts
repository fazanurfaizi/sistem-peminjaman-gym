export interface LoginRequest {
    email: string|null;
    password: string|null;
}

export interface RegisterRequest {
    name: string|null;
    npm: string|null;
    email: string|null;
    password: string|null;
}