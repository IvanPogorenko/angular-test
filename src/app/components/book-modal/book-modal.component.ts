import {Component, Input, OnDestroy, OnInit, Optional} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IBook } from '../../interfaces/IBook';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {BookStatusEnum} from '../../enums/BookStatusEnum';
import {BookService} from '../../services/book.service';
import {BookStateService} from '../../store/book/book-state.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-book-modal',
  standalone: true,
  templateUrl: './book-modal.component.html',
  imports: [
    NgIf,
    NgOptimizedImage,
    NgForOf
  ],
  styleUrl: './book-modal.component.scss'
})
export class BookModalComponent implements OnInit, OnDestroy {

  @Input() book!: IBook;

  public activeModal: NgbActiveModal | null;
  private subs = new Subscription();

  constructor(
    @Optional() public _activeModal: NgbActiveModal | null,
    private _route: ActivatedRoute,
    private _router: Router,
    private _bookStateService: BookStateService
  ) {
    this.activeModal = _activeModal;
  }

  ngOnInit() {
    if (this.book) return;
    this.subs.add(
      this._route.params.subscribe(params => {
        const bookId = params['id'];
        if (!bookId) return;
        this._bookStateService.loadBooks();
        this.subs.add(
          this._bookStateService.selectBookById(+bookId)
            .subscribe(found => {
              if (found) {
                this.book = found;
              }
            })
        );
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  get statusValues(): string[] {
    return Object.values(BookStatusEnum)
      .filter(value => value !== BookStatusEnum.ALL);
  }

  public delete() {
    this._bookStateService.deleteBook(this.book.id);
    this.close();
  }

  public onStatusChange(event: Event) {
    const selectedStatus = (event.target as HTMLSelectElement).value;
    this._bookStateService.updateBookStatus(this.book.id, selectedStatus);
  }

  public close() {
    if (this.activeModal) {
      this.activeModal.close();
    } else {
      this._router.navigate(['/catalog']);
    }
  }

  public dismiss() {
    if (this.activeModal) {
      this.activeModal.dismiss();
    } else {
      this._router.navigate(['/catalog']);
    }
  }
}
