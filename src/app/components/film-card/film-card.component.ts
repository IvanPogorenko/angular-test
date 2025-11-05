import {Component, Input} from '@angular/core';
import {IFilm} from '../../interfaces/IFilm';
import {RoutingService} from '../../routing.service';

@Component({
  selector: 'app-film-card',
  standalone: true,
  imports: [],
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.scss'
})
export class FilmCardComponent {

  @Input() film!: IFilm;

  constructor(
    private _routerService: RoutingService
  ) {
  }

  public goToFilm(){
    this._routerService.toFilm(this.film.id, this.film.name)
  }

}
