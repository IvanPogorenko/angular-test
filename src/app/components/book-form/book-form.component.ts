import {Component, EventEmitter, Output} from '@angular/core';
import {BookStatusEnum} from '../../enums/BookStatusEnum';
import {KeyValuePipe, NgForOf, NgTemplateOutlet} from '@angular/common';
import {IBook} from '../../interfaces/IBook';
import {FormsModule} from '@angular/forms';
import {BookStateService} from '../../store/book/book-state.service';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    KeyValuePipe,
    NgForOf,
    NgTemplateOutlet,
    FormsModule
  ],
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss'
})
export class BookFormComponent {

  @Output() close = new EventEmitter<void>();

  constructor(
    private _bookStateService: BookStateService
  ) {}

  public addedBook: IBook = {
    id: 0,
    name: "",
    description: "",
    status: BookStatusEnum.NOT_STARTED,
    author: "",
    img: ""
  };

  public onSubmit() {
    this._bookStateService.createBook(this.addedBook);
    this.addedBook = {
      id: 0,
      name: "",
      description: "",
      status: BookStatusEnum.NOT_STARTED,
      author: "",
      img: ""
    };
    this.close.emit()
  }

  get statusValues(): string[] {
    return Object.values(BookStatusEnum)
      .filter(value => value !== BookStatusEnum.ALL);
  }
}
