import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

export enum AppRoutes{
  MAIN = '',
  CATALOG = 'catalog'
}

export enum CatalogRoutes{
  BOOK = 'film/:id/:name'
}

export const toApp = ['/']
export const toBooks = [...toApp, AppRoutes.CATALOG]

export const appRoutes = {
  index: toApp,
  catalog: {
    index: toBooks,
    film: [...toBooks, CatalogRoutes.BOOK]
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

  public toBook(id: number, name: string){
    const routeSegments = this.divideSegments(appRoutes.catalog.film)
    const route = this.buildRoute(routeSegments, {id: id, name: name})
    return this._router.navigate(route)
  }
}
