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
  public timetable = [
      [
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "course": "编译原理",
                  "courseId": "(2017-2018-1)-A0504020-41317-2",
                  "teacherName": "黄孝喜",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": "3教3172",
                  "row": 2,
                  "tbstyle": "tb"
              }
          ],
          [
              {
                  "course": "创新实践2",
                  "courseId": "(2017-2018-1)-S0500500-40387-1",
                  "teacherName": "龚晓君",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": "3教3171",
                  "row": 2,
                  "tbstyle": "tb"
              },
              {
                  "course": "创新实践2",
                  "courseId": "(2017-2018-1)-S0500500-41325-1",
                  "teacherName": "僧德文",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": "3教3171",
                  "row": 4,
                  "tbstyle": "tb"
              },
              {
                  "course": "创新实践2",
                  "courseId": "(2017-2018-1)-S0500500-40394-1",
                  "teacherName": "徐海涛",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": "3教3171",
                  "row": 2,
                  "tbstyle": "tb"
              },
              {
                  "course": "创新实践2",
                  "courseId": "(2017-2018-1)-S0500500-41173-2",
                  "teacherName": "邱洪君",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": "3教3172",
                  "row": 2,
                  "tbstyle": "tb"
              },
              {
                  "course": "创新实践2",
                  "courseId": "(2017-2018-1)-S0500500-41676-1",
                  "teacherName": "黄彬彬",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": "3教3172",
                  "row": 2,
                  "tbstyle": "tb"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "course": "数据库课程设计",
                  "courseId": "(2017-2018-1)-S0507900-40392-1",
                  "teacherName": "金洁洁",
                  "weeks": "10,11,12,13,14,15,16,17",
                  "place": ";3教3171",
                  "row": 5,
                  "tbstyle": "tb"
              },
              {
                  "course": "数据库课程设计",
                  "courseId": "(2017-2018-1)-S0507900-40392-1",
                  "teacherName": "金洁洁",
                  "weeks": "10,11,12,13,14,15,16,17",
                  "place": ";3教3171",
                  "row": 5,
                  "tbstyle": "tb"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ]
      ],
      [
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ]
      ],
      [
          [
              {
                  "course": "数据库",
                  "courseId": "(2017-2018-1)-A0502570-40392-1",
                  "teacherName": "金洁洁",
                  "weeks": "7,10,12,14,16",
                  "place": "3教3172",
                  "row": 3,
                  "tbstyle": "tb"
              }
          ],
          [
              {
                  "course": "Falsh动画设计",
                  "courseId": "(2017-2018-1)-B0506390-41549-1",
                  "teacherName": "邢白夕",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": "3教3171",
                  "row": 3,
                  "tbstyle": "tb"
              },
              {
                  "course": "编译原理",
                  "courseId": "(2017-2018-1)-A0504020-41317-1",
                  "teacherName": "黄孝喜",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": "3教3172",
                  "row": 2,
                  "tbstyle": "tb"
              }
          ],
          [
              {
                  "course": "IOS移动开发",
                  "courseId": "(2017-2018-1)-B0502650-40394-2\t",
                  "teacherName": "徐海涛",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": "3教3171",
                  "row": 2,
                  "tbstyle": "tb"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ]
      ],
      [
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ]
      ],
      [
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ]
      ],
      [
          [
              {
                  "course": "Android移动开发",
                  "courseId": "(2017-2018-1)-B0502640-40382-1",
                  "teacherName": "吴昊",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": "3教3171",
                  "row": 4,
                  "tbstyle": "tb"
              },
              {
                  "course": "数据库",
                  "courseId": "(2017-2018-1)-A0502570-40392-2",
                  "teacherName": "金洁洁",
                  "weeks": "7,10,12,14,16",
                  "place": "3教3172",
                  "row": 4,
                  "tbstyle": "tb"
              }
          ],
          [
              {
                  "course": "Android移动开发",
                  "courseId": "(2017-2018-1)-B0502640-40382-2",
                  "teacherName": "吴昊",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": "3教3171",
                  "row": 4,
                  "tbstyle": "tb"
              },
              {
                  "course": "创新实践2",
                  "courseId": "(2017-2018-1)-S0500500-41173-1",
                  "teacherName": "邱洪君",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": "3教3172",
                  "row": 4,
                  "tbstyle": "tb"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "course": "软件过程与管理",
                  "courseId": "(2017-2018-1)-A0502600-40557-1",
                  "teacherName": "舒亚非",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": ";3教3171",
                  "row": 4,
                  "tbstyle": "tb"
              },
              {
                  "course": "软件过程与管理",
                  "courseId": "(2017-2018-1)-A0502600-40557-1",
                  "teacherName": "舒亚非",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": ";3教3171",
                  "row": 4,
                  "tbstyle": "tb"
              }
          ],
          [
              {
                  "course": "创新实践2",
                  "courseId": "(2017-2018-1)-S0500500-41614-1",
                  "teacherName": "陈婧",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": "3教3171",
                  "row": 4,
                  "tbstyle": "tb"
              },
              {
                  "course": "WEB应用程序设计(.NET)",
                  "courseId": "(2017-2018-1)-A0508190-41614-1",
                  "teacherName": "陈婧",
                  "weeks": "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17",
                  "place": "3教3172",
                  "row": 4,
                  "tbstyle": "tb"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ]
      ],
      [
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ]
      ],
      [
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ]
      ],
      [
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ]
      ],
      [
          [
              {
                  "course": "微专业",
                  "courseId": "(2017-2018-1)-B0506395-40387-1",
                  "teacherName": "龚晓君",
                  "weeks": "2,4,6,8,10,12,14,16",
                  "place": "3教3171",
                  "row": 3,
                  "tbstyle": "tb"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "course": "创新实践4",
                  "courseId": "(2017-2018-1)-S0500521-41614-1",
                  "teacherName": "陈婧",
                  "weeks": "2,4,6,8,10,12,14,16",
                  "place": "3教3172",
                  "row": 3,
                  "tbstyle": "tb"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ]
      ],
      [
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ]
      ],
      [
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ],
          [
              {
                  "empty": "empty"
              }
          ]
      ]
  ];
  constructor(){
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
