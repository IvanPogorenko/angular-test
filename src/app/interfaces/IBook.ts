import {BookStatusEnum} from '../enums/BookStatusEnum';

export interface IBook {
  id: number,
  name: string,
  description: string,
  author: string,
  status: BookStatusEnum,
  img: string
}

export function toIBook(data: any): IBook {
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    author: data.author,
    status: data.status,
    img: data.img
  }
}
