import { LocationChangeEvent } from "@angular/common";

export class Ticker {
  symbol?: string;
  lastprice?: number;
  dailychangepercent?: number;
  openprice?: number;
  bid?: number;
  ask?: number;
  high?: number;
  low?: number;
}
