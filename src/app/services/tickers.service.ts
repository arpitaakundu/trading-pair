
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticker } from '../models/ticker.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
const baseUrl = 'https://api-pub.bitfinex.com/v2/tickers?symbols=ALL';

@Injectable({
  providedIn: 'root'
})
export class TickersService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Ticker[]> {
   return this.http.get<Ticker[]>(baseUrl).pipe(
      map(data => {
        //console.log(data[0]);
        return data.map((element: any) => {

          return new Ticker(element[0], parseFloat(element[6]), parseFloat(element[7]));}

        );
      })
    );
    //return tickerList as any as Observable<Ticker[]>;
  }
}
