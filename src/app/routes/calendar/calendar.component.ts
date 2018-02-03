import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {CalendarService} from './calendar.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-calendar',
  templateUrl: 'calendar.component.html',
  styleUrls: ['./calendar.component.less'],
  providers: [CalendarService]
})

// interface course {
//   course: string
//   weeks: string,
//   place: string,
//   tbstyle: string,
//   row: number
// }

export class CalendarComponent implements OnInit {
  public week = 5;
  public timetable = [];
  constructor(private CalendarService: CalendarService){
      this.CalendarService.getCalendar('https://www.easy-mock.com/mock/5a5b5ba932a4fc7429df228a/calendar').then((result: any) => {
          console.log(result);
          this.timetable = JSON.parse(result['_body'])['courseTable']['courseTable'];
      })
  }
  ngOnInit(): void {
  }
  setStyles(s){
    let tb = {
      'backgroud':'#FFDDDD'
    };
    if(s=='tb')
      return tb;
  }
}
