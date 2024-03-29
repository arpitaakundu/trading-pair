import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TickersListComponent } from './components/tickers-list/tickers-list.component';
import { TickersDetailsComponent } from './components/tickers-details/tickers-details.component';
const routes: Routes = [{ path: '', redirectTo: 'tickers', pathMatch: 'full' },
{ path: 'tickers', component: TickersListComponent },
{ path: 'tickers/:symbol', component: TickersDetailsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
