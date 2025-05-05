import { Component, OnInit } from '@angular/core';
import { CharacterService } from './services/character.service';
import { Character, CharacterResponse} from './interfaces/character';
import {CardComponent} from './card/card.component';
import {NgForOf, NgIf} from '@angular/common';
import {ModalComponent} from './modal/modal.component';
import {PaginacionComponent} from './paginacion/paginacion.component';

@Component({
  selector: 'app-rick-and-morty',
  templateUrl: './rick-and-morty.component.html',
  imports: [
    CardComponent,
    NgIf,
    NgForOf,
    ModalComponent,
    PaginacionComponent
  ],
  styleUrls: ['./rick-and-morty.component.css']
})
export class RickAndMortyComponent implements OnInit {
  characters: Character[] = [];
  selectedCharacter?: Character;
  showModal: boolean = false;

  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private characterService: CharacterService) {}

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

  showDetails(character: Character): void {
    this.selectedCharacter = character;
    this.showModal = true;
  }

  onPageChange(newPage: number): void {
    this.getCharacters(newPage);
  }

  closeModal() {
    this.showModal = false;
    this.selectedCharacter = undefined; // esto forza a que se actualice y OnPush lo note
  }
}
