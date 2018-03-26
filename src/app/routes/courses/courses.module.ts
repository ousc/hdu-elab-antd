import {NgModule} from '@angular/core';
import {CoursesComponent} from './courses.component';
import {SharedModule} from '../../shared.module';
import {AddCourseComponent} from './addCourse/addCourse.component';
import {EditCourseComponent} from './editCourse/editCourse.component';

@NgModule({
  declarations: [CoursesComponent, AddCourseComponent, EditCourseComponent],
  imports: [SharedModule],
  exports: [CoursesComponent]
})

export class CoursesModule {

}
