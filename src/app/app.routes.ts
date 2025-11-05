import { Routes } from '@angular/router';
import {AppRoutes, CatalogRoutes} from './routing.service';
import {CatalogComponent} from './pages/catalog/catalog.component';
import {FilmModalComponent} from './components/film-modal/film-modal.component';
import {MainComponent} from './pages/main/main.component';

export const routes: Routes = [
  {
    path: AppRoutes.MAIN,
    component: MainComponent
  },
  {
    path: AppRoutes.CATALOG,
    component: CatalogComponent,
    children: [
      {
        path: CatalogRoutes.FILM,
        component: FilmModalComponent
      }
    ]
  },
];
