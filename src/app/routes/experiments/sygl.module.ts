import {NgModule} from '@angular/core';
import {SyglComponent} from './sygl.component';
import {SharedModule} from '../../shared.module';
import {CommonModule} from '@angular/common';
import {SyszComponent} from './sysz/sysz.component';
import {DcbgComponent} from './dcbg/dcbg.component';
import {DividerModule} from '@components/Divider/Divider.module';



@NgModule({
  declarations: [SyglComponent, SyszComponent, DcbgComponent],
  imports: [CommonModule, SharedModule, DividerModule],
  exports: [SyglComponent],
})

export class SyglModule {

}
