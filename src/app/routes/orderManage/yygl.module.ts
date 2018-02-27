import {NgModule} from '@angular/core';
import {YyglComponent} from './yygl.component';
import {SharedModule} from '../../shared.module';
import {DetailComponent} from './orderDetail/detail.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [YyglComponent, DetailComponent],
  imports: [SharedModule, RouterModule],
  exports: [YyglComponent]
})

export class YyglModule {

}
