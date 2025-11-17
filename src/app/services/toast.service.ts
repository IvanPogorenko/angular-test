import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {IServerMessage} from '../interfaces/IServerMessage';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private readonly _message$ = new Subject<IServerMessage>();
  public readonly message$ = this._message$.asObservable()

  public show(message: IServerMessage) {
    this._message$.next(message);
  }

}
