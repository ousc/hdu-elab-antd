import {NgModule} from '@angular/core';
import {SyglComponent} from './sygl.component';
import {SharedModule} from '../../shared.module';


@NgModule({
  declarations: [SyglComponent],
  imports: [SharedModule],
  exports: [SyglComponent]
})

export class SyglModule {

}
