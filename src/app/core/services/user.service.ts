import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';
import { UserJWTPayload } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly currentUser = signal<UserJWTPayload | null>(null);
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private router = inject(Router);

  constructor() {
    const token = this.getAuthToken();
    if (token) {
      this.setCurrentUser(token);
    }
  }

  login(email: string, password: string) {
    return this.http.post<{ message: string }>(
      `${this.apiUrl}/users/login`,
      {
        email,
        password,
      },
      {
        observe: 'response',
      }
    );
  }

  signup(fullName: string, email: string, password: string) {
    return this.http.post<{ message: string }>(`${this.apiUrl}/users/signup`, {
      fullName,
      email,
      password,
    });
  }

  getAuthToken() {
    return localStorage.getItem(environment.tokenKey);
  }

  setAuthToken(token: string) {
    localStorage.setItem(environment.tokenKey, token);
    this.setCurrentUser(token);
  }

  setCurrentUser(token: string) {
    const decodedToken = jwtDecode(token) as any;
    this.currentUser.set(decodedToken);
  }

  getCurrentUser() {
    return this.currentUser();
  }

  isOwner(userId: string) {
    return this.currentUser() ? this.currentUser()?.id === userId : false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(environment.tokenKey);
  }

  logout(): void {
    localStorage.removeItem(environment.tokenKey);
    this.currentUser.set(null);
    this.router.navigate(['/auth/login']);
  }
}
