import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';
import { Equipment, Resource } from '../interfaces/equipment.interface';
import { EquipmentDto } from '../interfaces/equipmentDto.interface';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private baseUrl: string = environment.baseUrl + '/equipment';
  private baseUrlResource: string = environment.baseUrl + '/resource';
  private baseUrlImage: string = environment.baseUrlImages;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getAll(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(`${this.baseUrl}`, this.authService.headers());
  }

  getById(id: string): Observable<Equipment | undefined> {
    return this.http.get<Equipment>(`${this.baseUrl}/${id}`, this.authService.headers())
      .pipe(
        catchError(err => of(undefined))
      );
  }

  getResource(id: string): Observable<Resource[]> {
    return this.http.get<Resource[]>(`${this.baseUrlResource}/by-emergency/${id}`, this.authService.headers());
  }

  saveImage(formData: FormData): Observable<any> {
    // return this.http.post('https://emergy-ws-production.up.railway.app/image/upload', formData);
    return this.http.post(`${this.baseUrlImage}`, formData);
  }

  create(equipmentDto: EquipmentDto): Observable<Equipment | undefined> {
    console.log(equipmentDto);
    return this.http.post<Equipment>(`${this.baseUrl}`, equipmentDto, this.authService.headers())
      .pipe(
        catchError(err => of(undefined))
      );
    // return of();
  }

  update(id: string, equipmentDto: EquipmentDto): Observable<Equipment | undefined> {
    return this.http.patch<Equipment>(`${this.baseUrl}/${id}`, equipmentDto, this.authService.headers()).pipe(
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
