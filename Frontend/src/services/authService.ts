import api from '../utils/api';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../types/User';

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const data = await api.post<AuthResponse>('/users/login', credentials);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const data = await api.post<AuthResponse>('/users/register', userData);
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
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