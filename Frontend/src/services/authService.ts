import api from '../utils/api';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../types/User';

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const data = await api.post<AuthResponse>('/auth/login', credentials);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    // Register only returns user data, not a token
    const data = await api.post<any>('/auth/register', userData);
    // Don't store token/user on registration, user needs to login
    return { user: data, token: '' };
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (!userStr || userStr === 'undefined') {
      return null;
    }
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      localStorage.removeItem('user');
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

const authService = new AuthService();
export default authService;