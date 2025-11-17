import {createFeatureSelector, createSelector} from '@ngrx/store';
import {BooksState} from './book.state';

export const selectBooksState = createFeatureSelector<BooksState>('books');

export const selectAllBooks = createSelector(
  selectBooksState,
  (state: BooksState) => state.books
);

export const selectBooksError = createSelector(
  selectBooksState,
  (state: BooksState) => state.error
);

export const selectBookById = (bookId: number) =>
  createSelector(selectAllBooks, (books) =>
    books.find((book) => book.id === bookId)
  );
