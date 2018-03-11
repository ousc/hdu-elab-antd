import {NgModule} from '@angular/core';
import {OrderManageComponent} from './orderManage.component';
import {SharedModule} from '../../shared.module';
import {DetailComponent} from './orderDetail/detail.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [OrderManageComponent, DetailComponent],
  imports: [SharedModule, RouterModule],
  exports: [OrderManageComponent]
})

export class OrderManageModule {

}
