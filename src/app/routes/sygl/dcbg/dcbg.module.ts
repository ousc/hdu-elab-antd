import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared.module';
import {DcbgComponent} from './dcbg.component';
import {CommonModule} from '@angular/common';




@NgModule({
  declarations: [DcbgComponent],
  imports: [SharedModule, CommonModule],
  exports: [DcbgComponent]
})

export class DcbgModule {

}
