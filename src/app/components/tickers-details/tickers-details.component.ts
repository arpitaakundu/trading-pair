
import {Component, OnInit,OnDestroy} from "@angular/core";
import {WebSocketService} from "src/app/wsservices/websocket.service";
import {Subscription} from "rxjs";
import { Trade } from "src/app/models/trade.model";
import { Ticker } from "src/app/models/ticker.model";


const ELEMENT_DATA: Trade[] = [
  {amount: 0.0345345, price: 2453443, time: '10:35:12 AM'},
  {amount: 0.0321345, price: 2452343, time: '10:35:10 AM'},
  {amount: 0.0553453, price: 2465443, time: '10:35:5 AM'},
  {amount: 0.0163453, price: 2457443, time: '10:35:1 AM'},
  {amount: 0.0345345, price: 2453443, time: '10:34:12 AM'},
  {amount: 0.0321345, price: 2452343, time: '10:34:10 AM'},
  {amount: 0.0553453, price: 2465443, time: '10:34:5 AM'},
  {amount: 0.0163453, price: 2457443, time: '10:34:1 AM'}]

  const tickerData: Ticker = {symbol:'tBCDUSD',bid:234524354,ask:33243423,dailychangerelative:1.24,dailychange:234234,lastprice:342235,openprice:342352,low:3423423,high:423432,pair:'BCD/USD',tilecolor:'green'}

@Component({
  selector: 'app-tickers-details',
  providers: [ WebSocketService ],
  templateUrl: './tickers-details.component.html',
  styleUrls: ['./tickers-details.component.css']
})
export class TickersDetailsComponent implements OnInit,OnDestroy {
  displayedColumns: string[] = ['amount', 'price', 'timestamp'];
  tradeDetailsList = ELEMENT_DATA;
  tickerDetails = tickerData;
  dataSource = this.tradeDetailsList;
  wsSubscription!: Subscription;
  caption='Market Trades'
  constructor() { }

  ngOnInit(): void {
  }
  closeSocket(){
    this.wsSubscription.unsubscribe();
  }

  ngOnDestroy() {
    this.closeSocket();
  }
}
