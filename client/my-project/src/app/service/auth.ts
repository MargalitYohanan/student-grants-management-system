import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthUser, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from '../class/user';

const TOKEN_KEY = 'sg_token';
const USER_KEY = 'sg_user';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private readonly apiUrl = 'http://localhost:3000/api/auth';
  private readonly _currentUser = signal<AuthUser | null>(this.readStoreUser());

  //הפונקציה asReadonly() לוקחת את ה-Signal ומורידה ממנו לחלוטין את האפשרות להשתמש ב-.set() או ב-.update()
  readonly currentUser = this._currentUser.asReadonly();
  readonly isLogIn = computed(() => this._currentUser() != null);
  readonly isAdmin = computed(() => this._currentUser()?.role == 'admin')

  constructor(private http: HttpClient) { }

  register(user: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/register`, user);
  }

  login(user: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, user).pipe(
      tap((result) => {
        localStorage.setItem(USER_KEY, JSON.stringify(result.existingUser));
        localStorage.setItem(TOKEN_KEY, result.token);
        this._currentUser.set(result.existingUser);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._currentUser.set(null)
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  private readStoreUser(): AuthUser | null {
    const u = localStorage.getItem(USER_KEY)
    if (!u)
      return null;
    try {
      return JSON.parse(u) as AuthUser;
    } catch {
      return null;
    }
  }
}
