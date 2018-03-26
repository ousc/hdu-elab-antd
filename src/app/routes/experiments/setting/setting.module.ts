import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared.module';
import {SettingComponent} from './setting.component';



@NgModule({
  declarations: [SettingComponent],
  imports: [SharedModule],
  exports: [SettingComponent]
})

export class SettingModule {

}
