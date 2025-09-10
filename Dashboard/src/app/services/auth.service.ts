import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService, User, LoginRequest, RegisterRequest, AuthResponse } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    // Check if user is already logged in
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    if (this.apiService.isAuthenticated()) {
      this.getProfile().subscribe({
        next: (response) => {
          if (response.success && response.user) {
            this.currentUserSubject.next(response.user);
          } else {
            this.logout();
          }
        },
        error: () => {
          this.logout();
        }
      });
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return new Observable(observer => {
      this.apiService.login(credentials).subscribe({
        next: (response: AuthResponse) => {
          if (response.success && response.token && response.user) {
            this.apiService.setToken(response.token);
            this.currentUserSubject.next(response.user);
            observer.next(response);
            observer.complete();
          } else {
            observer.error(new Error(response.message || 'Login failed'));
          }
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return new Observable(observer => {
      this.apiService.register(userData).subscribe({
        next: (response: AuthResponse) => {
          if (response.success && response.token && response.user) {
            this.apiService.setToken(response.token);
            this.currentUserSubject.next(response.user);
            observer.next(response);
            observer.complete();
          } else {
            observer.error(new Error(response.message || 'Registration failed'));
          }
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  getProfile(): Observable<AuthResponse> {
    return this.apiService.getProfile();
  }

  logout(): void {
    this.apiService.logout();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.apiService.isAuthenticated();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // Navigation helpers
  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  navigateToDashboard(): void {
    this.router.navigate(['/pages/dashboard']);
  }

  navigateToHome(): void {
    this.router.navigate(['/pages/home']);
  }

  updateProfile(userData: User): Observable<AuthResponse> {
    return new Observable(observer => {
      this.apiService.updateProfile(userData).subscribe({
        next: (response: AuthResponse) => {
          if (response.success && response.user) {
            this.currentUserSubject.next(response.user);
            observer.next(response);
            observer.complete();
          } else {
            observer.error(new Error(response.message || 'Profile update failed'));
          }
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }
}
