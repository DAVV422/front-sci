import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { User_Created, Usuario } from '../interfaces/response/login.interface';
import { UsuarioRequest  } from '../interfaces/request/usuario.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.baseUrl + '/user';
  private baseUrlUserNew: string = environment.baseUrl + '/register';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}`, this.authService.headers());
  }

  getById(id: string): Observable<Usuario | undefined> {
    return this.http.get<Usuario>(`${this.baseUrl}/${id}`, this.authService.headers())
      .pipe(
        catchError(err => of(undefined))
      );
  }

  create(usuario: User_Created): Observable<Usuario | undefined> {
    const { ...rest } = usuario;
    console.log(rest);
    return this.http.post<Usuario>(`${this.baseUrlUserNew}`, rest,
    this.authService.headers()
      ).pipe(
      catchError(err => of(undefined))
    );
  }

  update(usuario: UsuarioRequest): Observable<Usuario | undefined> {
    if (!usuario.id) throw new Error('No se ha encontrado el id del usuario');
    if (usuario.password === '') {
      const { password, ...rest } = usuario;
      return this.http.patch<Usuario>(`${this.baseUrl}/${usuario.id}`, rest, this.authService.headers()).pipe(
        catchError(err => of(undefined))
      );
    }
    return this.http.patch<Usuario>(`${this.baseUrl}/${usuario.id}`, usuario, this.authService.headers()).pipe(
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
