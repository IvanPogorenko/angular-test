import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable} from 'rxjs';
import {IBook, toIBook} from '../interfaces/IBook';
import {IServerMessage, toServerMessage} from '../interfaces/IServerMessage';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  public getBooksHttp(): Observable<IBook[]>{
    return this._httpClient.get<any>('/books').pipe(
      map(data => data.map(toIBook))
    )
  }

  public createBookHttp(book: IBook): Observable<IServerMessage>{
    return this._httpClient.post("/create-book", {book: book}).pipe(
      map((data) => toServerMessage(data))
    )
  }

  public deleteBookHttp(bookId: number): Observable<IServerMessage>{
    return this._httpClient.delete(`/delete-book/${bookId}`).pipe(
      map(data => toServerMessage(data))
    )
  }

  public updateStatusHttp(bookId: number, newStatus: string): Observable<IServerMessage>{
    return this._httpClient.patch(`/update-status/${bookId}/${newStatus}`, {}).pipe(
      map(data => toServerMessage(data))
    )
  }
}
