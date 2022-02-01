import { LocationChangeEvent } from "@angular/common";

export class Ticker {
  public symbol?: string;
  public bid?: number;
  public ask?: number;
  public dailychange?:number;
  public dailychangerelative: number = 0;
  public openprice?: number;
  public lastprice?: number;
  public volume?: number;
  public high?: number;
  public low?: number;
  public tilecolor:string = 'lightgreen';
  public pair?:string;
  public index:number = 0;
  constructor(symbol:string, dailychangerelative: number,lastprice:number ) {
    //specify your own constructor logic
    this.symbol=symbol;
    this.dailychangerelative = dailychangerelative;
    this.lastprice = lastprice;
  }
}
