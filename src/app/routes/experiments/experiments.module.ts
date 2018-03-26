import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared.module';
import {CommonModule} from '@angular/common';
import {DividerModule} from '@components/Divider/Divider.module';
import {ExperimentsComponent} from './experiments.component';
import {SettingComponent} from './setting/setting.component';
import {ExportFormComponent} from './exportForm/exportForm.component';



@NgModule({
  declarations: [ExperimentsComponent, SettingComponent, ExportFormComponent],
  imports: [CommonModule, SharedModule, DividerModule],
  exports: [ExperimentsComponent],
})

export class ExperimentsModule {

}
