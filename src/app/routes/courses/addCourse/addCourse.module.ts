import {NgModule} from '@angular/core';
import {AddCourseComponent} from './addCourse.component';
import {SharedModule} from '../../../shared.module';

@NgModule({
  declarations: [AddCourseComponent],
  imports: [SharedModule],
  exports: [AddCourseComponent]
})

export class AddCourseModule {

}
