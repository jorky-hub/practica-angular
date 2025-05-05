import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {
  private apiUrl = 'https://rickandmortyapi.com/api/episode';

  constructor(private http: HttpClient) {}

  // Obtener varios episodios por array de IDs
  getEpisodesByIds(ids: number[]): Observable<any> {
    const idsParam = ids.join(',');
    return this.http.get<any>(`${this.apiUrl}/${idsParam}`);
  }
}
