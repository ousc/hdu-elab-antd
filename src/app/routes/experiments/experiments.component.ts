///<reference path="../../../../node_modules/@angular/forms/src/model.d.ts"/>
///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {ExperimentsService} from './experiments.service';


@Component({
  selector: 'Setting',
  templateUrl: 'experiments.component.html',
  styleUrls: ['./experiments.component.less'],
  providers: [ExperimentsService]
})

export class ExperimentsComponent {
    bodyStyle = { padding: 0 };
    /*实验情况：本周实验数，已安排实验学时，总实验数*/
    experiments = { weeknum : 3 , hour: 96, sum: 48};
    /*实验列表*/
    data = [
        {
            course    : '数据结构课程设计', /*课程名称*/
            coursetime : '周一123节 1-17周', /*课程时间*/
            expnum : 16, /*已安排实验*/
        }, {
            course    : '数据结构课程设计',
            coursetime : '周一123节 1-17周',
            expnum : 16,
        }, {
            course    : '数据结构课程设计',
            coursetime : '周一123节 1-17周',
            expnum : 16,
        }, {
            course    : '课程设计',
            coursetime : '周一123节 1-17周',
            expnum : 16,
        }
    ];
    onSearch(event: string): void {
        console.log(event);
    }
}

