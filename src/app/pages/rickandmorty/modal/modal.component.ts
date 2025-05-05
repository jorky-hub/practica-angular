import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Character } from '../interfaces/character';
import { Location } from '../interfaces/location';
import { TitleCasePipe, CommonModule } from '@angular/common';
import {Router} from '@angular/router';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  imports: [
    TitleCasePipe,
    CommonModule,
  ],
  styleUrls: ['./modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {

  @Input() character!: Character;
  @Input() location?: Location;

  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() verUbicacionCompleta = new EventEmitter<void>();

  constructor(private router: Router) {}


  closeModal() {
    this.close.emit(); // avisamos al componente padre
  }

  verTodosLosEpisodios() {
    const episodeUrls: string[] = this.character.episode;
    const episodeIds = episodeUrls.map(url => +url.split('/').pop()!);
    this.router.navigate(['/episodios'], { queryParams: { ids: episodeIds.join(',') } });
  }
}
