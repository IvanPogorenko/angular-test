import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {IBook} from '../../interfaces/IBook';
import {Store} from '@ngrx/store';
import * as BooksSelectors from './book.selectors';
import * as BooksActions from './book.actions';
import {BooksState} from './book.state';

@Injectable({
  providedIn: 'root'
})
export class BookStateService {

  public books$: Observable<IBook[]>;
  public error$: Observable<unknown>;

  constructor(private store: Store<BooksState>) {
    this.books$ = this.store.select(BooksSelectors.selectAllBooks);
    this.error$ = this.store.select(BooksSelectors.selectBooksError);
  }

  public selectBookById(id: number): Observable<IBook | undefined> {
    return this.store.select(BooksSelectors.selectBookById(id));
  }

  public loadBooks(): void {
    this.store.dispatch(BooksActions.loadBooks());
  }

  public createBook(book: IBook): void {
    this.store.dispatch(BooksActions.createBook({ book }));
  }

  public deleteBook(bookId: number): void {
    this.store.dispatch(BooksActions.deleteBook({ bookId }));
  }

  public updateBookStatus(bookId: number, newStatus: string): void {
    this.store.dispatch(BooksActions.updateBookStatus({ bookId, newStatus }));
  }

}
