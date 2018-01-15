import {NgModule} from '@angular/core';
import {OrderComponent} from './order.component';
import {SharedModule} from '../../shared.module';

@NgModule({
  declarations: [OrderComponent],
  imports: [SharedModule],
  exports: [OrderComponent]
})

export class OrderModule {

}
