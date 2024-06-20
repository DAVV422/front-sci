import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Emergency } from '../interfaces/emergency.interface';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  private baseUrl: string = environment.baseUrl + '/emergency';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAll(): Observable<Emergency[]> {
    return this.http.get<Emergency[]>(`${this.baseUrl}`, this.authService.headers());
  }

  getById(id: string): Observable<Emergency | undefined> {
    return this.http.get<Emergency>(`${this.baseUrl}/${id}`, this.authService.headers())
      .pipe(
        catchError(err => of(undefined))
      );
  }

  create(emergency: Emergency): Observable<Emergency> {
    const { id, form201, user, attends, resources, ...rest } = emergency;
    return this.http.post<Emergency>(`${this.baseUrl}`, rest,
    this.authService.headers());
  }

  update(emergency: Emergency): Observable<Emergency | undefined> {
    const {user, ...rest} = emergency;
    if (!emergency.id) throw new Error('No se ha encontrado el id de la emergencia');
    return this.http.patch<Emergency>(`${this.baseUrl}/${emergency.id}`, rest, this.authService.headers())
    .pipe(
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
