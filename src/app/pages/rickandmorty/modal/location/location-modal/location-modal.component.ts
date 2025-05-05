import { Component, Input, Output, EventEmitter } from '@angular/core';

import {NgIf, JsonPipe, DatePipe, NgForOf} from '@angular/common';
import {Location} from '../../../interfaces/location';

@Component({
  selector: 'app-location-modal',
  standalone: true,
  imports: [NgIf, DatePipe, NgForOf],
  templateUrl: './location-modal.component.html',
  styleUrls: ['./location-modal.component.css']
})
export class LocationModalComponent {
  @Input() location!: Location;
  @Output() close = new EventEmitter<void>();

  cerrarModal(): void {
    this.close.emit();
  }
}
