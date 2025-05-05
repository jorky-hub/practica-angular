import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-paginacion',
  templateUrl: './paginacion.component.html',
  imports: [NgClass, NgForOf, NgIf],
  styleUrls: ['./paginacion.component.css'],
  standalone: true
})
export class PaginacionComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Output() changePage = new EventEmitter<number>(); // Cambiado: emite solo el número

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }

  next() {
    if (this.currentPage < this.totalPages) {
      this.changePage.emit(this.currentPage + 1);
    }
  }

  prev() {
    if (this.currentPage > 1) {
      this.changePage.emit(this.currentPage - 1);
    }
  }

  goToPage(page: number | string) {
    if (typeof page === 'number' && page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.changePage.emit(page);
    }
  }

  getPaginationArray(): (number | string)[] {
    const maxPagesToShow = 5;
    const pages: (number | string)[] = [];

    if (this.totalPages <= maxPagesToShow) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      let start = Math.max(2, this.currentPage - 1);
      let end = Math.min(this.totalPages - 1, this.currentPage + 1);

      if (start > 2) pages.push('...');
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (end < this.totalPages - 1) pages.push('...');
      pages.push(this.totalPages);
    }

    return pages;
  }
}
