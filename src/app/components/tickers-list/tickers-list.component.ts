import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import {MatGridListModule} from '@angular/material/grid-list';
import { Ticker } from 'src/app/models/ticker.model';
import { TickersService } from 'src/app/services/tickers.service';
@Component({
  selector: 'app-tickers-list',
  templateUrl: './tickers-list.component.html',
  styleUrls: ['./tickers-list.component.css']
})
export class TickersListComponent implements OnInit {

  tickers? : Ticker[];
  constructor(private tickerService:TickersService,private router: Router) { }

  ngOnInit(): void {
    this.retriveTickers();
  }
  retriveTickers():void {
    this.tickerService.getAll()
    .subscribe({
      next: (data)=>{
      this.tickers = data;
      this.tickers = this.tickers.filter( e => e.symbol?.startsWith("t"));
      this.tickers = this.tickers
                         .map(item => { if(item.dailychangerelative < 0)
                                          {item.tilecolor = "lightcoral"; }
                                        else
                                          {item.tilecolor = "lightgreen";}
                                          item.dailychangerelative = parseFloat((item.dailychangerelative * 100).toFixed(2));
                                          item.pair = item.symbol?.substring(1, 4) + "/" + item.symbol?.substring(4);
                                          return item;
                        });
     },
      error:(e) => {console.error(e)}
    })
  }

//   public navigateToTickerDetails(item: Ticker) {
//     debugger;
//     console.log(item.pair);
//     this.router.navigate(['/ticker/'+item.symbol]);
// }

}
