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
      this.CalendarService.getCalendar('class/getCourseTableByUsername').then((result: any) => {
          this.timetable = JSON.parse(result['_body'])['courseTable']['courseTable'];
      })
  }
    apiUrl = [
        'semester/getNowSemester', // 0
    ];
    // 获取学期
    nowSemester = {
        nowSemester: '',
        maxWeek: 17
    };
    private getSemester() {
        this.CalendarService.executeGET(this.apiUrl[0])
            .then((result: any) => {
                const res = JSON.parse(result['_body']);
                if (res['result'] === 'success') {
                    this.nowSemester = res['NowSemester'];
                }
            });
    }
  ngOnInit(): void {
      this.getSemester();
  }
  setStyles(s){
    let tb = {
      'backgroud':'#FFDDDD'
    };
    if(s=='tb')
      return tb;
  }
}
