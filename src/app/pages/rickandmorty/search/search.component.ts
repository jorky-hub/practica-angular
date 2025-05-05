import { Component, Output, EventEmitter } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
})
export class SearchComponent {
  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();

  onSearch() {
    const trimmed = this.searchTerm.trim();
    if (trimmed) {
      this.search.emit(trimmed);
      this.searchTerm = '';
    }
  }
}
