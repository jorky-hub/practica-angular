import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { EpisodeService } from '../services/episode.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-episodes',
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './episodes.component.html'
})
export class EpisodesComponent implements OnInit {
  episodes: any[] = [];


  constructor(
    private route: ActivatedRoute,
    private episodeService: EpisodeService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const idsParam = params['ids'];
      if (idsParam) {
        const ids = idsParam.split(',').map((id: string) => +id);
        this.episodeService.getEpisodesByIds(ids).subscribe(data => {
          this.episodes = Array.isArray(data) ? data : [data]; // Si es solo 1, lo convierte en array

        });
      }
    });
  }
}
