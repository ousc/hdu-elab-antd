import {NgModule} from '@angular/core';
import {CoursesComponent} from './courses.component';
import {SharedModule} from '../../shared.module';
import {AddCourseComponent} from './addCourse/addCourse.component';
import {EditCourseComponent} from './editCourse/editCourse.component';
import {HistoricalCoursesComponent} from './historicalcourses/historicalCourses.component';

@NgModule({
  declarations: [CoursesComponent, AddCourseComponent, EditCourseComponent, HistoricalCoursesComponent],
  imports: [SharedModule],
  exports: [CoursesComponent]
})

export class CoursesModule {

}
