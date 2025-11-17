import {IBook} from '../../interfaces/IBook';

export interface BooksState {
  books: IBook[];
  error: unknown;
}

export const initialState: BooksState = {
  books: [],
  error: null
};
