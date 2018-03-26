import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared.module';
import {RouterModule} from '@angular/router';
import {OrderManageComponent} from './orderManage.component';
import {HistoricalOrdersComponent} from './historicalOrders/historicalOrders.component';

@NgModule({
  declarations: [OrderManageComponent, HistoricalOrdersComponent],
  imports: [SharedModule, RouterModule],
  exports: [OrderManageComponent]
})

export class OrderManageModule {

}
