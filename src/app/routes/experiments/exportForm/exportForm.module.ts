import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared.module';
import {CommonModule} from '@angular/common';
import {DividerModule} from '@components/Divider/Divider.module';
import {ExportFormComponent} from './exportForm.component';




@NgModule({
  declarations: [ExportFormComponent],
  imports: [SharedModule.forRoot(), CommonModule, DividerModule],
  exports: [ExportFormComponent]
})

export class ExportFormModule {

}
