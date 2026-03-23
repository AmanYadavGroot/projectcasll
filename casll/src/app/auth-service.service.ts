// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export interface UserInfo {
  message: string;
  email: string;
  username: string;
  role: string;
}

export interface RegisterRequestDto {
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthServiceservice {
  public userRole = new BehaviorSubject<string | null>(null);
  userRole$ = this.userRole.asObservable();

  private readonly tokenStorageKey = 'auth_token';
  
  constructor(private http: HttpClient) {
    // Check if token exists and verify user info from API
    this.initializeUserFromToken();
  }
  
  getToken(): string | null {
    return localStorage.getItem(this.tokenStorageKey);
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenStorageKey, token);
  }

  clearToken() {
    localStorage.removeItem(this.tokenStorageKey);
  }


  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  routeForRole(role: 'admin' | 'editor' | 'guest'): '/admin' | '/editor' | '/guest' {
    return role === 'admin' ? '/admin' : role === 'editor' ? '/editor' : '/guest';
  }

  register(payload: RegisterRequestDto): Observable<boolean> {
    if (!payload.email || !payload.password) return of(false);
    return this.http.post<any>('https://localhost:7149/api/Auth/register', payload).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  login(email: string, password: string): Observable<boolean> {
    if (!email || !password) return of(false);
    return this.http.post<{ token: string }>('https://localhost:7149/api/Auth/login', { email, password }).pipe(
      tap(res => this.setToken(res.token)),
      map(() => true),
      catchError(() => of(false))
    );
  }

  logout() {
    this.userRole.next(null);
    this.clearToken();
  }

  getRole() {
    return this.userRole.value;
  }

  getUserInfo(): Observable<UserInfo | null> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }

    return this.http.get<UserInfo>('https://localhost:7149/api/auth/me', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': '*/*'
      }
    }).pipe(
      catchError(() => of(null))
    );
  }

  private initializeUserFromToken(): void {
    const token = this.getToken();
    if (token) {
      // Verify token with API and get current user info
      this.getUserInfo().subscribe(userInfo => {
        if (userInfo && userInfo.role) {
          const role = userInfo.role.toLowerCase() as 'admin' | 'editor' | 'guest';
          this.userRole.next(role);
        } else {
          // If API call fails, clear invalid token
          this.clearToken();
          this.userRole.next(null);
        }
      });
    } else {
      this.userRole.next(null);
    }
  }

  // Method to handle immediate navigation after login
  handlePostLoginNavigation(router: any, abilityService: any): void {
    this.getUserInfo().subscribe(userInfo => {
      if (userInfo && userInfo.role) {
        const role = userInfo.role.toLowerCase() as 'admin' | 'editor' | 'guest';
        this.userRole.next(role);
        abilityService.defineAbilitiesFor({ role });
        // Use setTimeout to ensure navigation happens after current execution cycle
        setTimeout(() => {
          router.navigate([this.routeForRole(role)]);
        }, 0);
      }
    });
  }

}
