import { Component, OnInit } from '@angular/core';
import { Ticker } from 'src/app/models/ticker.model';
import { TickersService } from 'src/app/services/tickers.service';
@Component({
  selector: 'app-tickers-list',
  templateUrl: './tickers-list.component.html',
  styleUrls: ['./tickers-list.component.css']
})
export class TickersListComponent implements OnInit {

  tickers? : Ticker[];
  tickerSymbols : string[] = [];
  constructor(private tickerService:TickersService) { }

  ngOnInit(): void {
    this.retriveTickers();
  }
  retriveTickers():void {
    this.tickerService.getAll()
    .subscribe({
      next: (data)=>{
      this.tickers = data;
      this.tickers = this.tickers.filter( e => e.symbol?.startsWith("t"));
      this.tickerSymbols = this.tickers.map(element => element.symbol || '');
      sessionStorage.setItem('tickerSymbols',JSON.stringify(this.tickerSymbols));
      this.tickers = this.tickers
                         .map((item,i=0) => { if(item.dailychangerelative < 0)
                                          {item.tilecolor = "lightcoral"; }
                                        else
                                          {item.tilecolor = "lightgreen";}
                                          item.dailychangerelative = parseFloat((item.dailychangerelative * 100).toFixed(2));
                                          item.pair = item.symbol?.substring(1, 4) + "/" + item.symbol?.substring(4);
                                          item.index = i;
                                          i++;
                                          return item;
                        });
     },
      error:(e) => {console.error(e)}
    })
  }

  setCurrentIndex(index:number){
    sessionStorage.setItem('currentIndex',index.toString());
  }

}
