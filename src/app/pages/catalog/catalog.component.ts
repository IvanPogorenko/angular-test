import {Component, OnInit} from '@angular/core';
import {FilmCardComponent} from '../../components/film-card/film-card.component';
import {CatalogService} from './catalog.service';
import {IFilm} from '../../interfaces/IFilm';
import {NgForOf} from '@angular/common';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FilmModalComponent} from '../../components/film-modal/film-modal.component';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    FilmCardComponent,
    NgForOf,
    RouterOutlet
  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit{

  constructor(
    private _catalogService: CatalogService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _modal: NgbModal
  ) {
  }

  public films : IFilm[] = [];

  ngOnInit() {
    this._catalogService.getFilms().subscribe({
      next: value => {
        this.films = value
      }
    })
  }

  openFilmModal(id: string) {
    const film = this.films.find((f) => f.id.toString() === id)
    if (!film) return

    const modalRef = this._modal.open(FilmModalComponent, { size: "lg", centered: true })
    modalRef.componentInstance.film = film

    modalRef.closed.subscribe(() => this._router.navigate(["/catalog"]))
    modalRef.dismissed.subscribe(() => this._router.navigate(["/catalog"]))
  }

}
