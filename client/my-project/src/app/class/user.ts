export type UserRole = 'student' | 'admin';

export interface AuthUser {
  userId: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}

export interface LoginRequest {
  userId: string;
  password: string;
}

export interface RegisterRequest {
  userId: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  existingUser: AuthUser;
}

export interface RegisterResponse {
  message: string;
}
