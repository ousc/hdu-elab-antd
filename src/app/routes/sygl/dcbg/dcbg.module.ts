import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared.module';
import {DcbgComponent} from './dcbg.component';
import {CommonModule} from '@angular/common';
import {DividerModule} from '@components/Divider/Divider.module';




@NgModule({
  declarations: [DcbgComponent],
  imports: [SharedModule.forRoot(), CommonModule, DividerModule],
  exports: [DcbgComponent]
})

export class DcbgModule {

}
