import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { UsuarioRequest } from '../../auth/interfaces/request/usuario.interface';
import { AuthService } from '../../auth/services/auth.service';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.baseUrl + '/user';  

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}`, this.authService.headers());
  }

  getById(id: string): Observable<User | undefined> {
    return this.http.get<User>(`${this.baseUrl}/${id}`, this.authService.headers())
      .pipe(
        catchError(err => of(undefined))
      );
  }

  update(usuario: UsuarioRequest): Observable<User | undefined> {
    if (!usuario.id) throw new Error('No se ha encontrado el id del usuario');
    if (usuario.password === '') {
      const { password, ...rest } = usuario;
      return this.http.patch<User>(`${this.baseUrl}/${usuario.id}`, rest, this.authService.headers()).pipe(
        catchError(err => of(undefined))
      );
    }
    return this.http.patch<User>(`${this.baseUrl}/${usuario.id}`, usuario, this.authService.headers()).pipe(
      catchError(err => of(undefined))
    );
  }

  delete(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/${id}`, this.authService.headers())
      .pipe(
        map(() => true),
        catchError(err => of(false)),
      );
  }

}
