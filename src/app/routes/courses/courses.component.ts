///<reference path="../../../../node_modules/@angular/forms/src/model.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {CoursesService} from './courses.service';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {SessionStorageService} from '@core/storage/storage.module';

@Component({
  selector: 'app-login',
  templateUrl: 'courses.component.html',
  styleUrls: ['./courses.component.less'],
  providers: [CoursesService]
})
export class CoursesComponent implements OnInit {
    constructor(private CoursesService: CoursesService, private confirmServ: NzModalService, private  router: Router,
                private _storage: SessionStorageService) {
    }
    apiUrl = [
        'http://aliyun.charlesxu.cn:8080/LabManager/class/getclassbyusername', /*0获取课程*/
        'http://aliyun.charlesxu.cn:8080/LabManager/class/deleteclass', /*1删除课程*/
    ];
    WEEK = ['日', '一', '二', '三', '四', '五', '六', '日'];
    _value = ''; /*搜索内容*/
    choice = 'all';
    courses = [];
    data = [
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
    // 编辑课程
    editCourse(data: any) {
        const str = JSON.stringify(data);
        this._storage.set('course', str);
        this.router.navigate(['/courses/edit']);
    }
    // 删除课程
    private delClass(data: any) {
        this.CoursesService.delClass(this.apiUrl[1], data)
            .then((result: any) => {
                const res = JSON.parse(result['_body']);
                if (res['result'] === 1) {
                    this.success();
                }
            });
    }
    success = () => {
        const modal = this.confirmServ.success({
            title: '删除成功',
            content: '1秒后刷新'
        });
        const Route = this.router;
        setTimeout(function () {
            modal.destroy();
            window.location.reload();
        }, 1000);
    }
    onSearch(event: string): void {
        console.log(event);
    }
    ngOnInit(): void {
        this._getData();
    }

}
