import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ToastService} from '../../services/toast.service';
import {IServerMessage} from '../../interfaces/IServerMessage';
import {NgClass, NgIf} from '@angular/common';
import {BookStateService} from '../../store/book/book-state.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit{

  public message: IServerMessage | null = null;
  public show = false

  constructor(
    private _toastService: ToastService,
    private _bookStateService: BookStateService
  ) {
  }

  ngOnInit() {
    this._bookStateService.error$.subscribe(error => {
      if (error !== null){
        this.show = true;
        this.message = {
          ...this.message,
          error: true,
          message: "Непредвиденная ошибка"
        };
        this.timer();
      }
    })
    this._toastService.message$.subscribe((msg: IServerMessage) => {
      this.message = msg;
      this.show = true;
      this.timer();
    });
  }

  private timer(){
    setTimeout(() => {
      this.show = false;
      this.message = null;
    }, 5000);
  }

}
