import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { catchError, tap, map } from 'rxjs/operators';
import { EMPTY,Subject } from 'rxjs';
export const WS_ENDPOINT = environment.wsUrl;

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$!: WebSocketSubject<any>;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe();

  public connect(channel:string,symbol:string): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.getNewWebSocket(channel,symbol);
      const messages = this.socket$.pipe(
        map(data => {return data;}),
        tap({
          error: error => console.log(error),
        }), catchError(_ => EMPTY));
      this.messagesSubject$.next(messages);
    }
  }

  private getNewWebSocket(channel:string,symbol:string) {
    return webSocket({
      url: WS_ENDPOINT,
      serializer: msg => JSON.stringify({
        event: 'subscribe',
        channel: channel,
        symbol: symbol
      }),
    });
  }

  sendMessage(msg: any) {
    this.socket$.next(msg);
  }
  close() {
    this.socket$.complete(); }}
