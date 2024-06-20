import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { Login, Usuario } from '../interfaces/response/login.interface';
import { Router } from '@angular/router';
import { UsuarioRequest } from '../interfaces/request/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(email: string, password: string): Observable<Login> {
    return this.http.post<Login>(`${this.baseUrl}/login`, { email, password });
  }

  checkToken(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');    
    return this.http.post<boolean>(`${this.baseUrl}/checkToken`, { token }).
      pipe(
        map(user => !!user),
        map(isAuth => {
          if (!isAuth) this.logout();
          return isAuth;
        }),
        catchError(err => of(false))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/auth/login']);
  }

  getToten(): string {
    return localStorage.getItem('token') || '';
  }

  headers() {
    return {
      headers: { Authorization: `Bearer ${this.getToten()}` }
    }
  }

  checkPermission(permisos: string[]): Observable<boolean> {
    let userLS = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userLS) return of(false);
    return of(true);
  }

  register(usuario: UsuarioRequest):  Observable<Login> {
    const { id, ...rest } = usuario;
    this.http.post<Usuario>(`${this.baseUrl}/register`, { rest }).pipe(
      catchError(err => of(undefined))
    );
    const { email, password } = rest;
    return this.http.post<Login>(`${this.baseUrl}/login`, { email, password });
  }

  checkPermissionLocal(permisos: string[]): boolean {
    let userLS = JSON.parse(localStorage.getItem('user') || '{}');
    if (!userLS) return false;
    return true;
  }

}

