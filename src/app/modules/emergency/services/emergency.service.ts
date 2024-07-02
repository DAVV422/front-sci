import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Action, Attend, Charge, Emergency, EmergencyUpdate } from '../interfaces/emergency.interface';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  private baseUrl: string = environment.baseUrl + '/emergency';
  private baseUrlAttend: string = environment.baseUrl + '/attend';
  private baseUrlCharge: string = environment.baseUrl + '/charge';
  private baseUrlAction: string = environment.baseUrl + '/action';

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

  update(emergency: EmergencyUpdate): Observable<Emergency | undefined> {
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


  getAttends(id:string): Observable<Attend[]>{
    return this.http.get<Attend[]>(`${this.baseUrlAttend}/emergency/${id}`, this.authService.headers());
  }

  createAttend(charge: string, user: string, emergency: string, date: Date): Observable<Attend> {    
    return this.http.post<Attend>(`${this.baseUrlAttend}`, { charge, date, user, emergency },
    this.authService.headers());
  }

  deleteAttend(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrlAttend}/${id}`, this.authService.headers())
      .pipe(
        map(() => true),
        catchError(err => of(false)),
      );
  }

  getCharge(name:string): Observable<Charge> {
    const charge = {name:name};
    return this.http.post<Charge>(`${this.baseUrlCharge}/name`, charge, this.authService.headers());
  }

  getActions(id: string): Observable<Action>{
    return this.http.get<Action>(`${this.baseUrlAction}/emergency/${id}`, this.authService.headers());
  }

}
