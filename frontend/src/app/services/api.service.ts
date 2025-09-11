import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
  _id?: string;
  fullName: string;
  email: string;
  password?: string; // Make password optional for profile updates
  phone: string;
  communication?: string;
  language?: string;
  farmName?: string;
  farmLocation?: string;
  farmSize?: number;
  primaryCrops?: string[];
  secondaryCrops?: string[];
  sprayerType?: string;
  iotDevices?: string[];
  machinery?: string[];
  pesticides?: Array<{
    name: string;
    frequency: string;
  }>;
  fertilizerPreference?: string;
  monthlyExpenditure?: number;
  createdAt?: Date;
  farmingExperience: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  communication?: string;
  language?: string;
  farmName?: string;
  farmLocation?: string;
  farmSize?: number;
  primaryCrops?: string[];
  secondaryCrops?: string[];
  sprayerType?: string;
  iotDevices?: string[];
  machinery?: string[];
  pesticides?: Array<{
    name: string;
    frequency: string;
  }>;
  fertilizerPreference?: string;
  monthlyExpenditure?: number;
  farmingExperience: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  user?: User;
  errors?: string[];
}

export interface UsersResponse {
  success: boolean;
  message: string;
  count?: number;
  users?: User[];
  errors?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    });
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      console.error('Full backend error response:', error.error);
      console.error('Error status:', error.status);

      if (error.error && error.error.message) {
        errorMessage = error.error.message;
        // Add detailed validation errors if available
        if (error.error.errors && Array.isArray(error.error.errors)) {
          errorMessage += ': ' + error.error.errors.join(', ');
        }
      } else if (error.status === 0) {
        errorMessage = 'Unable to connect to server. Please check your internet connection.';
      } else if (error.status === 400) {
        errorMessage = 'Bad Request: Please check your input data.';
        if (error.error && error.error.errors) {
          errorMessage += ' Errors: ' + JSON.stringify(error.error.errors);
        }
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }

    return throwError(() => new Error(errorMessage));
  }

  // Authentication methods
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(catchError(this.handleError));
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
      .pipe(catchError(this.handleError));
  }

  getProfile(): Observable<AuthResponse> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/profile`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  getAllUsers(): Observable<UsersResponse> {
    return this.http.get<UsersResponse>(`${this.apiUrl}/users`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }
   // Get comprehensive app data
  getAppData(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/app-data`)
      .pipe(catchError(this.handleError));
  }

  updateProfile(userData: User): Observable<AuthResponse> {
    return this.http.put<AuthResponse>(`${this.apiUrl}/profile`, userData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError));
  }

  // Utility methods
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  logout(): void {
    this.removeToken();
  }
}
