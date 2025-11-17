import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as BooksActions from './book.actions';
import {catchError, map, mergeMap, of} from 'rxjs';
import {BookService} from '../../services/book.service';
import {ToastService} from '../../services/toast.service';

@Injectable()
export class BooksEffects {

  loadBooks$
  createBook$
  deleteBook$
  updateBookStatus$

  constructor(
    private _actions$: Actions,
    private _bookService: BookService,
    private _toastService: ToastService
  ) {

    this.loadBooks$ = createEffect(() =>
      this._actions$.pipe(
        ofType(BooksActions.loadBooks),
        mergeMap(() =>
          this._bookService.getBooksHttp().pipe(
            map((books) => BooksActions.loadBooksSuccess({ books })),
            catchError((error) =>
              of(BooksActions.loadBooksFailure({ error }))
            )
          )
        )
      )
    );

    this.createBook$ = createEffect(() =>
      this._actions$.pipe(
        ofType(BooksActions.createBook),
        mergeMap(({ book }) =>
          this._bookService.createBookHttp(book).pipe(
            mergeMap((message) => {
              this._toastService.show({
                ...message,
                error: false
              })
              return [
                BooksActions.loadBooks(),
                BooksActions.createBookSuccess({ message }),
              ]
            }),
            catchError((error) =>
              of(BooksActions.createBookFailure({ error }))
            )
          )
        )
      )
    );

    this.deleteBook$ = createEffect(() =>
      this._actions$.pipe(
        ofType(BooksActions.deleteBook),
        mergeMap(({ bookId }) =>
          this._bookService.deleteBookHttp(bookId).pipe(
            mergeMap((message) => {
              this._toastService.show({
                ...message,
                error: false
              })
              return [
                BooksActions.deleteBookSuccess({message}),
                BooksActions.loadBooks()
              ]
            }),
            catchError((error) =>
              of(BooksActions.deleteBookFailure({ error }))
            )
          )
        )
      )
    );

    this.updateBookStatus$ = createEffect(() =>
      this._actions$.pipe(
        ofType(BooksActions.updateBookStatus),
        mergeMap(({ bookId, newStatus }) =>
          this._bookService.updateStatusHttp(bookId, newStatus).pipe(
            mergeMap((message) => {
              this._toastService.show({
                ...message,
                error: false
              })
              return [
                BooksActions.updateBookStatusSuccess({message}),
                BooksActions.loadBooks()
              ]
            }),
            catchError((error) =>
              of(BooksActions.updateBookStatusFailure({ error }))
            )
          )
        )
      )
    );

  }

}
