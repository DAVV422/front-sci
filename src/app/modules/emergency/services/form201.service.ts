import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Form201 } from '../interfaces/emergency.interface';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class Form201Service {

  private baseUrl: string = environment.baseUrl + '/form201';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getByEmergency(id: string): Observable<Form201[]> {
    return this.http.get<Form201[]>(`${this.baseUrl}/by-emergency/${id}`, this.authService.headers());
  }

  getById(id: string): Observable<Form201 | undefined> {
    return this.http.get<Form201>(`${this.baseUrl}/${id}`, this.authService.headers())
      .pipe(
        catchError(err => of(undefined))
      );
  }

  create(form201: Form201): Observable<Form201> {
    const { id, emergency, ...rest } = form201;
    return this.http.post<Form201>(`${this.baseUrl}`, rest,
    this.authService.headers());
  }

  update(form201: Form201): Observable<Form201 | undefined> {
    const {emergency, ...rest} = form201;
    if (!form201.id) throw new Error('No se ha encontrado el id de la emergencia');
    return this.http.patch<Form201>(`${this.baseUrl}/${form201.id!}`, rest, this.authService.headers())
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
