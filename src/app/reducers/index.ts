import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import {BooksState} from '../store/book/book.state';
import {booksReducer} from '../store/book/book.reducer';

export interface State {
  books: BooksState
}

export const reducers: ActionReducerMap<State> = {
  books: booksReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
