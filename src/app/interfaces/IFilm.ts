export interface IFilm {
  id: number,
  name: string,
  year: number,
  genre: string[],
  duration: number,
  description: string,
  img: string
}

export function toIFilm(data: any): IFilm {
  return {
    id: data.id,
    name: data.name,
    year: data.year,
    genre: data.genre,
    duration: data.duration,
    description: data.description,
    img: data.img
  }
}
