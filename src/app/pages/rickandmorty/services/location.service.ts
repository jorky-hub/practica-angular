import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from '../interfaces/location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly baseUrl = 'https://rickandmortyapi.com/api/location';

  constructor(private http: HttpClient) {}

  // Obtiene un Location usando su ID
  getLocationById(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.baseUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error obteniendo ubicación con ID ${id}:`, error);
        return throwError(() => new Error('Error al cargar la ubicación'));
      })
    );
  }

  // Obtiene un Location usando una URL completa (como las que vienen en los personajes)
  getLocationByUrl(): Observable<Location> {
    return this.http.get<Location>(`${this.baseUrl}`).pipe(
      catchError(error => {
        console.error(`Error obteniendo ubicación con URL ${this.baseUrl}:`, error);
        return throwError(() => new Error('Error al cargar la ubicación'));
      })
    );
  }
}
