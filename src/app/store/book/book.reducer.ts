import {createReducer, on} from '@ngrx/store';
import {initialState} from './book.state';
import * as BooksActions from './book.actions';

export const booksReducer = createReducer(
  initialState,

  on(BooksActions.loadBooks, (state) => ({
    ...state,
    error: null
  })),
  on(BooksActions.loadBooksSuccess, (state, { books }) => ({
    ...state,
    books,
    error: null
  })),
  on(BooksActions.loadBooksFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(BooksActions.createBook, (state) => ({
    ...state,
    error: null
  })),
  on(BooksActions.createBookSuccess, (state) => ({
    ...state,
    error: null
  })),
  on(BooksActions.createBookFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(BooksActions.deleteBook, (state) => ({
    ...state,
    error: null
  })),
  on(BooksActions.deleteBookSuccess, (state) => ({
    ...state,
    error: null
  })),
  on(BooksActions.deleteBookFailure, (state, { error }) => ({
    ...state,
    error
  })),
  
  on(BooksActions.updateBookStatus, (state) => ({
    ...state,
    error: null
  })),
  on(BooksActions.updateBookStatusSuccess, (state) => ({
    ...state,
    error: null
  })),
  on(BooksActions.updateBookStatusFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
