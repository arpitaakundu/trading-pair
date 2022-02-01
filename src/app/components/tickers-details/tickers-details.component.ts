import { environment } from './../../../environments/environment.prod';
import {Component, OnInit,OnDestroy} from "@angular/core";
import {WebSocketService} from "src/app/wsservices/websocket.service";
import {Observable, Subscription} from "rxjs";
import { Trade } from "src/app/models/trade.model";
import { Ticker } from "src/app/models/ticker.model";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";


const ELEMENT_DATA: Trade[] = [
  {amount: 0.0345345, price: 2453443, time: '10:35:12 AM'},
  {amount: 0.0321345, price: 2452343, time: '10:35:10 AM'},
  {amount: 0.0553453, price: 2465443, time: '10:35:5 AM'},
  {amount: 0.0163453, price: 2457443, time: '10:35:1 AM'},
  {amount: 0.0345345, price: 2453443, time: '10:34:12 AM'},
  {amount: 0.0321345, price: 2452343, time: '10:34:10 AM'},
  {amount: 0.0553453, price: 2465443, time: '10:34:5 AM'},
  {amount: 0.0163453, price: 2457443, time: '10:34:1 AM'}]

  const tickerData: Ticker = {symbol:'tBTCUSD',bid:234524354,ask:33243423,dailychangerelative:1.24,dailychange:234234,lastprice:342235,openprice:342352,low:3423423,high:423432,pair:'BTC/USD',tilecolor:'green',index:0}

@Component({
  selector: 'app-tickers-details',
  providers: [ WebSocketService ],
  templateUrl: './tickers-details.component.html',
  styleUrls: ['./tickers-details.component.css']
})
export class TickersDetailsComponent implements OnInit,OnDestroy {
  [x: string]: any;
  displayedColumns: string[] = ['amount', 'price', 'timestamp'];
  prevnextsymbol : string = '';
  paramSymbol : string = '';
  tradeDetailsList = ELEMENT_DATA;
  tickerDetails = tickerData;
  dataSource = this.tradeDetailsList;
  currentIndex:number = 0;
  wsurl:string = '';


  constructor(private route: ActivatedRoute,
    private router: Router,private wsService: WebSocketService) {

      }

  ngOnInit(): void {
    this.route.params.subscribe( params => this.paramSymbol = params["symbol"]);
    this.getTickerDetails();
    this.getTradeDetails();
  }

  getTickerDetails(){
    this.wsService.connect('ticker',this.paramSymbol);
    this.wsService.messages$.subscribe({
      next: (data)=>{
      console.log('Ticker:'+data);
     },
      error:(e) => {console.error(e)}
    })
  }

  getTradeDetails(){
    this.wsService.connect('trades',this.paramSymbol);
    this.wsService.messages$.subscribe({
      next: (data)=>{
      console.log('Trade:'+data);
     },
      error:(e) => {console.error(e)}
    })
  }

  pairSwitchTicker(direction:string){
    this.currentIndex = parseInt(JSON.parse(sessionStorage.getItem("currentIndex") || '0'));
    var tickerSymbols:string[] = JSON.parse(sessionStorage.getItem("tickerSymbols")|| '{}');
    if(direction == 'prev'){
      this.currentIndex = this.currentIndex === 0 ? tickerSymbols.length - 1 : this.currentIndex -1;
    }
    else{
      this.currentIndex = (this.currentIndex === tickerSymbols.length - 1) ? 0 : this.currentIndex + 1;
    }
    this.prevnextsymbol = tickerSymbols[this.currentIndex];
    sessionStorage.setItem('currentIndex',this.currentIndex.toString());
    this.paramSymbol = this.prevnextsymbol;
    this.router.navigateByUrl( '/tickers/'+this.prevnextsymbol );
    this.getTickerDetails();
    this.getTradeDetails();
  }

  back(){
    this.router.navigateByUrl( '/tickers' );
  }

  ngOnDestroy() {

  }
}
