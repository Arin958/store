export type UserRole = 'customer' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  password: string;
}

export interface AuthState {
  user: Omit<User, 'password'> | null; 
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  getUserRole: () => UserRole | null;
}