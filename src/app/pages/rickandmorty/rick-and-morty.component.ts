import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // <- Importa el router
import { CharacterService } from './services/character.service';
import { LocationService } from './services/location.service';
import { Character, CharacterResponse } from './interfaces/character';
import { Location } from './interfaces/location';

import { CardComponent } from './card/card.component';
import { ModalComponent } from './modal/modal.component';
import { PaginacionComponent } from './paginacion/paginacion.component';
import { LocationModalComponent } from './modal/location/location-modal/location-modal.component';

import { NgForOf, NgIf } from '@angular/common';
import {SearchComponent} from './search/search.component';

@Component({
  selector: 'app-rick-and-morty',
  templateUrl: './rick-and-morty.component.html',
  styleUrls: ['./rick-and-morty.component.css'],
  imports: [
    CardComponent,
    ModalComponent,
    PaginacionComponent,
    NgIf,
    NgForOf,
    LocationModalComponent,
    SearchComponent
  ],
})
export class RickAndMortyComponent implements OnInit {
  characters: Character[] = [];
  selectedCharacter?: Character;
  selectedLocation?: Location;

  showModal: boolean = false;
  showLocationModal: boolean = false;

  currentPage: number = 1;
  totalPages: number = 1;

  constructor(
    private characterService: CharacterService,
    private locationService: LocationService,
    private router: Router // <- Inyecta el router
  ) {}

  ngOnInit(): void {
    this.getCharacters(this.currentPage);
  }

  getCharacters(page: number): void {
    this.characterService.getAllCharacters(page).subscribe((response: CharacterResponse) => {
      this.characters = response.results;
      this.currentPage = page;
      this.totalPages = response.info.pages;
    });
  }

  getLocation(locationId: number): void {
    this.locationService.getLocationById(locationId).subscribe({
      next: (location: Location) => {
        this.selectedLocation = location;
      },
      error: (error) => {
        console.error('Error cargando la ubicación:', error);
        this.selectedLocation = undefined;
      }
    });
  }

  showDetails(character: Character): void {
    this.selectedCharacter = character;
    this.showModal = true;

    if (character.location?.url) {
      const locationId = parseInt(character.location.url.split('/').pop() || '0', 10);
      if (locationId) {
        this.getLocation(locationId);
      }
    } else {
      this.selectedLocation = undefined;
    }
  }

  onPageChange(newPage: number): void {
    this.getCharacters(newPage);
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedCharacter = undefined;
    this.selectedLocation = undefined;
  }

  verUbicacionCompleta(): void {
    this.showModal = false;
    this.showLocationModal = true;
  }

  closeLocationModal(): void {
    this.showLocationModal = false;
  }

  searchCharacterByName(name: string): void {
    this.characterService.searchCharacterByName(name).subscribe({
      next: (response: CharacterResponse) => {
        this.characters = response.results;
        this.totalPages = 1;
        this.currentPage = 1;
      },
      error: () => {
        this.characters = []; // No se encontró personaje
      }
    });
  }

}
