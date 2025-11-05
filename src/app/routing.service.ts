import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

export enum AppRoutes{
  MAIN = '',
  CATALOG = 'catalog'
}

export enum CatalogRoutes{
  FILM = 'film/:id/:name'
}

export const toApp = ['/']
export const toFilms = [...toApp, AppRoutes.CATALOG]

export const appRoutes = {
  index: toApp,
  catalog: {
    index: toFilms,
    film: [...toFilms, CatalogRoutes.FILM]
  }
}

@Injectable({
  providedIn: 'root'
})
export class RoutingService {

  constructor(
    private _router: Router
  ) { }

  private divideSegments(route: string[]): string[]{
    return route.flatMap(segment =>
      segment.split('/').filter(s => s.length > 0)
    );
  }

  private buildRoute(template: string[], params: Record<string, string | number>): string[] {
    return template.map((segment) => {
      if (segment.startsWith(':')){
        return segment.replace(/:(\w+)/g, (match, paramName) => {
          if (params[paramName] !== undefined){
            return String(params[paramName])
          }
          return match
        })
      }
      return segment
    })
  }

  public toFilm(id: number, name: string){
    const routeSegments = this.divideSegments(appRoutes.catalog.film)
    const route = this.buildRoute(routeSegments, {id: id, name: name})
    console.log(routeSegments)
    return this._router.navigate(route)
  }
}
