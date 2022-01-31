
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticker } from '../models/ticker.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TickersService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Ticker[]> {
   return this.http.get<Ticker[]>(environment.apiTickerBaseUrl+"ALL").pipe(
      map(data => {
        return data.map((element: any) => {
          return new Ticker(element[0], parseFloat(element[6]), parseFloat(element[7]));}
        );
      })
    );
    //return tickerList as any as Observable<Ticker[]>;
  }
}
