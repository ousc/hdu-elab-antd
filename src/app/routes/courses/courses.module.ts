import {NgModule} from '@angular/core';
import {CoursesComponent} from './courses.component';
import {SharedModule} from '../../shared.module';
import {AddcourseComponent} from './addcourse/addcourse.component';
import {AddcourseModule} from './addcourse/addcourse.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [SharedModule],
  exports: [CoursesComponent]
})

export class CoursesModule {

}
