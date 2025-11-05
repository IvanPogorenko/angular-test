import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IFilm, toIFilm} from '../../interfaces/IFilm';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(
    private _httpClient: HttpClient
  ) { }

  public getFilms() : Observable<IFilm[]>{
    return this._httpClient.get<any>('/films').pipe(
      map(data => data.map(toIFilm))
    )
  }

}
