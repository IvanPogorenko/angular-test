import {Component, Input, OnInit, Optional} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IFilm } from '../../interfaces/IFilm';
import {ActivatedRoute, Router} from '@angular/router';
import {CatalogService} from '../../pages/catalog/catalog.service';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-film-modal',
  standalone: true,
  templateUrl: './film-modal.component.html',
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  styleUrl: './film-modal.component.scss'
})
export class FilmModalComponent implements OnInit{
  @Input() film!: IFilm
  public activeModal: NgbActiveModal | null

  constructor(
    @Optional()
    public _activeModal: NgbActiveModal | null,
    private _route: ActivatedRoute,
    private _router: Router,
    private _catalogService: CatalogService,
  ) {
    this.activeModal = _activeModal
  }

  ngOnInit() {
    if (!this.film) {
      this._route.params.subscribe((params) => {
        const filmId = params["id"]
        if (filmId) {
          this._catalogService.getFilms().subscribe((films) => {
            const foundFilm = films.find((f) => f.id.toString() === filmId)
            if (foundFilm) {
              this.film = foundFilm
            }
          })
        }
      })
    }
  }

  close() {
    if (this.activeModal) {
      this.activeModal.close()
    } else {
      this._router.navigate(["/catalog"])
    }
  }

  dismiss() {
    if (this.activeModal) {
      this.activeModal.dismiss()
    } else {
      this._router.navigate(["/catalog"])
    }
  }
}
