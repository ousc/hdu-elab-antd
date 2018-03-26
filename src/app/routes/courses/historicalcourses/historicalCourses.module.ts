import {NgModule} from '@angular/core';
import {HistoricalCoursesComponent} from './historicalCourses.component';
import {SharedModule} from '../../../shared.module';


@NgModule({
  declarations: [HistoricalCoursesComponent],
  imports: [SharedModule],
  exports: [HistoricalCoursesComponent]
})

export class HistoricalCoursesModule {

}
