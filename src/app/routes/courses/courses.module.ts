import {NgModule} from '@angular/core';
import {CoursesComponent} from './courses.component';
import {SharedModule} from '../../shared.module';
import {AddcourseComponent} from './addCourse/addcourse.component';
import {AddcourseModule} from './addCourse/addcourse.module';
import {EditcourseComponent} from './editCourse/editcourse.component';

@NgModule({
  declarations: [CoursesComponent, AddcourseComponent, EditcourseComponent],
  imports: [SharedModule],
  exports: [CoursesComponent]
})

export class CoursesModule {

}
