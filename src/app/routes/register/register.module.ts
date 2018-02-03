import {NgModule} from '@angular/core';
import {RegisterComponent} from './register.component';
import {SharedModule} from '../../shared.module';
import {DividerModule} from "@components/Divider/Divider.module";

@NgModule({
  declarations: [RegisterComponent],
  imports: [SharedModule.forRoot(),DividerModule],
  exports: [RegisterComponent]
})

export class RegisterModule {

}
