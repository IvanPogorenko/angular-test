import {Component, Input} from '@angular/core';
import {IBook} from '../../interfaces/IBook';
import {RoutingService} from '../../routing.service';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {

  @Input() book!: IBook;

  constructor(
    private _routerService: RoutingService
  ) {
  }

  public goToBook(){
    this._routerService.toBook(this.book.id, this.book.name)
  }

}
