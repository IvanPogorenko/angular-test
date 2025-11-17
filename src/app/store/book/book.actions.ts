import {createAction, props} from '@ngrx/store';
import {IBook} from '../../interfaces/IBook';
import {IServerMessage} from '../../interfaces/IServerMessage';

export const loadBooks = createAction('[Books] Load Books');
export const loadBooksSuccess = createAction(
  '[Books] Load Books Success',
  props<{ books: IBook[] }>()
);
export const loadBooksFailure = createAction(
  '[Books] Load Books Failure',
  props<{ error: unknown }>()
);

export const createBook = createAction(
  '[Books] Create Book',
  props<{ book: IBook }>()
);
export const createBookSuccess = createAction(
  '[Books] Create Book Success',
  props<{ message: IServerMessage }>()
);
export const createBookFailure = createAction(
  '[Books] Create Book Failure',
  props<{ error: unknown }>()
);

export const deleteBook = createAction(
  '[Books] Delete Book',
  props<{ bookId: number }>()
);
export const deleteBookSuccess = createAction(
  '[Books] Delete Book Success',
  props<{ message: IServerMessage }>()
);
export const deleteBookFailure = createAction(
  '[Books] Delete Book Failure',
  props<{ error: unknown }>()
);

export const updateBookStatus = createAction(
  '[Books] Update Book Status',
  props<{ bookId: number; newStatus: string }>()
);
export const updateBookStatusSuccess = createAction(
  '[Books] Update Book Status Success',
  props<{ message: IServerMessage }>()
);
export const updateBookStatusFailure = createAction(
  '[Books] Update Book Status Failure',
  props<{ error: unknown }>()
);
