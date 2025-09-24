import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../../core/models/movie.model';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent {
  @Input() movie: Movie | null = null;
  @Input() imageUrl = '';
  @Output() cardClick = new EventEmitter<Movie>();

  onCardClick() {
    if (this.movie) {
      this.cardClick.emit(this.movie);
    }
  }
}
