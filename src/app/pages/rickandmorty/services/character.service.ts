import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character, CharacterResponse } from '../interfaces/character';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private readonly url='https://rickandmortyapi.com/api/character';

  constructor(private http:HttpClient) { }

   // Obtener todos los personajes (página 1 por defecto)
   getAllCharacters(page: number = 1): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.url}?page=${page}`);
  }

  // Obtener personaje por ID
  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.url}/${id}`);
  }

  // Buscar personaje por nombre
  searchCharacterByName(name: string): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(`${this.url}/?name=${name}`);
  }
}
