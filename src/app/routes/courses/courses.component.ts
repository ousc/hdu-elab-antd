///<reference path="../../../../node_modules/@angular/forms/src/model.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {CoursesService} from './courses.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';
import {SessionStorageService} from '@core/storage/storage.module';
import {YyglService} from '../yygl/yygl.service';
@Component({
  selector: 'app-login',
  templateUrl: 'courses.component.html',
  styleUrls: ['./courses.component.less'],
  providers: [CoursesService]
})
export class CoursesComponent implements OnInit {
    constructor(private CoursesService: CoursesService, private confirmServ: NzMessageService, private  router: Router,
                private _storage: SessionStorageService) {
    }
    apiUrl = [
        'http://aliyun.charlesxu.cn:8080/LabManager/class/getclassbyusername', /*0获取课程*/
    ];
    WEEK = ['日', '一', '二', '三', '四', '五', '六', '日'];
    _value = ''; /*搜索内容*/
    choice = 'all';
    courses = [];
    data = [
        {
            course : '数据结构课程设计',
            coursetime : '周一123节 1-17周',
            hour : 16,
            addtime : '2016-06-06 14:03',
            progress : 70
        },
        {
            course : '数据结构课程设计',
            coursetime : '周一678节 1-17周',
            hour : 16,
            addtime : '2016-06-06 14:03',
            progress : 20
        },
    ];
    private getAllHours(courses: any) {
        let hours = 0;
        for (let course of courses) {
            hours += course.classNum.length * course.classWeek.length;
        }
        return hours;
    }
    private getWeekHours(courses: any) {
        let hours = 0;
        for (let course of courses) {
            hours += course.classNum.length;
        }
        return hours;
    }
    private getHours(course: any) {
        return course.classNum.length * course.classWeek.length;
    }
    private _getData = () => {
        // 获取课程
        this.CoursesService.getCourses(this.apiUrl[0], this._storage.get('username'))
            .then((result: any) => {
                this.courses = JSON.parse(result['_body'])['course'];
            });
    }
    onSearch(event: string): void {
        console.log(event);
    }
    ngOnInit(): void {
        this._getData();
    }

}
