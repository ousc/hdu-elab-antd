///<reference path="../../../../node_modules/@angular/forms/src/model.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {CoursesService} from './courses.service';
import {Router} from '@angular/router';
import {NzModalService} from 'ng-zorro-antd';
import {SessionStorageService} from '@core/storage/storage.module';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'courses',
  templateUrl: 'courses.component.html',
  styleUrls: ['./courses.component.less'],
  providers: [CoursesService]
})
export class CoursesComponent implements OnInit {
    constructor(private CoursesService: CoursesService, private confirmServ: NzModalService, private  router: Router,
                private _storage: SessionStorageService, private fb: FormBuilder) {
    }
    validateForm: FormGroup;
    apiUrl = [
        'class/getclassbyusername', /*0获取课程*/
        'class/deleteclass', /*1删除课程*/
        'semester/getNowSemester', // 2
    ];
    options = [
        { value: '2016', label: '2016' },
        { value: '2017', label: '2017' },
        { value: '2018', label: '2018' },
        { value: '2019', label: '2019' },
    ];
    WEEK = ['日', '一', '二', '三', '四', '五', '六', '日'];
    _value = ''; /*搜索内容*/
    choice = 'all';
    courses = [];
    data = [];
    // 获取学期
    nowSemester = {
        nowSemester: '',
        maxWeek: 17
    };
    private getSemester() {
        this.CoursesService.executeGET(this.apiUrl[2])
            .then((result: any) => {
                const res = JSON.parse(result['_body']);
                if (res['result'] === 'success') {
                    this.nowSemester = res['NowSemester'];
                }
            });
    }
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
        // 获取当前学期信息
        this.getSemester();
        // 获取课程
        this.CoursesService.executeHttp(this.apiUrl[0], {userName: this._storage.get('username')})
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
        this.CoursesService.executeHttp(this.apiUrl[1], data)
            .then((result: any) => {
                const res = JSON.parse(result['_body']);
                if (res['result'] === 1) {
                    this.success();
                    this._getData();
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
        }, 1000);
    }
    // 获取历史课程
    currentModal;
    showModalForTemplate(titleTpl, contentTpl, footerTpl) {
        const form = this.validateForm;
        let _storage = this._storage;
        const Route = this.router;
        this.currentModal = this.confirmServ.open({
            title       : titleTpl,
            content     : contentTpl,
            footer      : footerTpl,
            onOk() {
                const str = form.controls['fy'].value.value + '-' +
                    form.controls['sy'].value.value + '-' + form.controls['type'].value;
                _storage.set('historyCourses', str);
                Route.navigate(['/courses/history']);
            },
            onCancel() {
            },
        });
    }
    handleCancel(e) {
        this.currentModal.destroy('onCancel');
        this.currentModal = null;
    }
    isConfirmLoading = false;
    handleOk(e) {
        this.isConfirmLoading = true;
        setTimeout(() => {
            this.currentModal.destroy('onOk');
            this.isConfirmLoading = false;
            this.currentModal = null;
        }, 1000);
    }
    onSearch(event: string): void {
        console.log(event);
    }
    ngOnInit(): void {
        this.validateForm = this.fb.group({
            fy: [null, this.validateForm],
            sy: [null, this.validateForm],
            type: [null, this.validateForm]
        });
        this._getData();
    }

}
