import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Character } from '../interfaces/character';
import { TitleCasePipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  imports: [
    TitleCasePipe,
    CommonModule
  ],
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  @Input() character!: Character;
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>(); // para comunicar al padre

  closeModal() {
    this.close.emit(); // avisamos al componente padre
  }
}
