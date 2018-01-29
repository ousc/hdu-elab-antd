import {NgModule} from '@angular/core';
import {OrdersComponent} from './orders.component';
import {SharedModule} from '../../shared.module';
import {DetailComponent} from './detail/detail.component';

@NgModule({
  declarations: [OrdersComponent, DetailComponent],
  imports: [SharedModule],
  exports: [OrdersComponent]
})

export class OrdersModule {

}
