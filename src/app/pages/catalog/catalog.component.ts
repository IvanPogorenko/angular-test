import {Component, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {BookCardComponent} from '../../components/book-card/book-card.component';
import {IBook} from '../../interfaces/IBook';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {ActivatedRoute, Router, RouterOutlet} from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {BookStatusEnum} from '../../enums/BookStatusEnum';
import {BookFormComponent} from '../../components/book-form/book-form.component';
import {Subscription} from 'rxjs';
import {BookStateService} from '../../store/book/book-state.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [
    BookCardComponent,
    NgForOf,
    RouterOutlet,
    KeyValuePipe,
    BookFormComponent,
    NgIf,

  ],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit, OnDestroy{

  public books: IBook[] = [];
  public showedBooks: IBook[] = [];
  public error: any = null;

  private subs = new Subscription();

  @ViewChild('formContainer', { read: ViewContainerRef })
  private container!: ViewContainerRef;
  protected componentRef!: ComponentRef<BookFormComponent> | null;

  constructor(
    private _bookStateService: BookStateService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _modal: NgbModal,
  ) {}

  ngOnInit() {
    this._bookStateService.loadBooks();
    this.subs.add(
      this._bookStateService.books$.subscribe(books => {
        this.books = books;
        this.showedBooks = books;
      })
    );
    this.subs.add(
      this._bookStateService.error$.subscribe(err => {
        this.error = err;
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onChangeSelect(event: Event) {
    const selectedStatus = (event.target as HTMLSelectElement).value;

    if (selectedStatus === BookStatusEnum.ALL) {
      this.showedBooks = this.books;
      return;
    }

    this.showedBooks = this.books.filter(b => b.status === selectedStatus);
  }

  public addComponent() {
    this.deleteComponent();
    this.componentRef = this.container.createComponent(BookFormComponent);
    this.componentRef.instance.close.subscribe(() => {
      this.deleteComponent()
    })
  }

  public deleteComponent() {
    this.container.clear();
    this.componentRef = null;
  }

  protected readonly BookStatusEnum = BookStatusEnum;
}
