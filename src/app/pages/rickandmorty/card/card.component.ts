import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Character } from '../interfaces/character';
import { NgIf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  imports: [
    TitleCasePipe,
    NgIf
  ],
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() character!: Character;
  @Output() openModal = new EventEmitter<Character>();

  isLoading: boolean = false;
  isLoadingDetails: boolean = false;

  verDetalle($event: MouseEvent) {
    // Evita llamadas duplicadas
    if (this.isLoading || this.isLoadingDetails) return;

    // No hay más spinner, lo quitamos
    this.isLoadingDetails = false;

    // Emitimos el personaje al padre para abrir el modal
    this.openModal.emit(this.character);
  }


}
