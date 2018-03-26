import {NgModule} from '@angular/core';
import {EditCourseComponent} from './editCourse.component';
import {SharedModule} from '../../../shared.module';

@NgModule({
  declarations: [EditCourseComponent],
  imports: [SharedModule],
  exports: [EditCourseComponent]
})

export class EditCourseModule {

}
