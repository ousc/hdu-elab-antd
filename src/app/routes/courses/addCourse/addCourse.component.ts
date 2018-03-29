///<reference path="../../../../../node_modules/@angular/forms/src/model.d.ts"/>
///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {AddCourseService} from './addCourse.service';
import {NzModalService} from 'ng-zorro-antd';
import {SessionStorageService} from '@core/storage/storage.service';
import {Router} from '@angular/router';

@Component({
    selector: 'AddCourse',
    templateUrl: 'addCourse.component.html',
    styleUrls: ['./addCourse.component.less'],
    providers: [AddCourseService]
})
export class AddCourseComponent implements OnInit {
    validateForm: FormGroup;
    loadStatus: boolean;
    submitBtn = '提交';
    curl = [
        'class/addclass', // 0 添加课程
        'semester/getNowSemester' // 1获取当前学期
    ];
    constructor(private _storage: SessionStorageService, private fb: FormBuilder, private router: Router,
                private addcourseService: AddCourseService, private confirmServ: NzModalService) {
    }
    week = [];
    weekday = [{ value: 1, label: '星期一' },
        { value: 2, label: '星期二' },
        { value: 3, label: '星期三' },
        { value: 4, label: '星期四' },
        { value: 5, label: '星期五' },
        { value: 6, label: '星期六' },
        { value: 7, label: '星期日' }
    ];
    classNum = [{ value: 1, label: '第1节' },
        { value: 2, label: '第2节' },
        { value: 3, label: '第3节' },
        { value: 4, label: '第4节' },
        { value: 5, label: '第5节' },
        { value: 6, label: '第6节' },
        { value: 7, label: '第7节' },
        { value: 8, label: '第8节' },
        { value: 9, label: '第9节' },
        { value: 10, label: '第10节' },
        { value: 11, label: '第11节' },
        { value: 12, label: '第12节' },
    ];
    nowSemester = {
        nowSemester: '',
        maxWeek: 17
    };
    private setInitWeek() {
        for (let i = 0; i < 30; i++) {
            this.week[i] = {value : i + 1, label: (i + 1).toString()};
        }
        console.log(this.week);
    }
    /*//控制全选单双重置*/
    setWeek = (target, operation) => {
        this.validateForm.controls[target].reset();
        if (operation == 0) {
            let c = this.validateForm.value;
            c.week = this.week;
            this.validateForm.setValue(c);
        }
        if(operation==1){
            let c = this.validateForm.value;
            c.week = [];
            for(let i=0;i< this.week.length;i++){
                if(i%2==0){
                    c.week.push(this.week[i]);
                }
            }
            this.validateForm.setValue(c);
        }
        if(operation==2){
            let c = this.validateForm.value;
            c.week = [];
            for(let i=0;i< this.week.length;i++){
                if(i%2){
                    c.week.push(this.week[i]);
                }
            }
            this.validateForm.setValue(c);
        }
    };
    //控制全选单双重置

    getFormControl(name) {
        return this.validateForm.controls[name];
    }

    info(title, contentTpl) {
        this.confirmServ.info({
            title: title,
            content: contentTpl
        });
    }
    success = () => {
        const modal = this.confirmServ.success({
            title: '添加成功',
            content: '1秒后回到课程管理'
        });
        const Route = this.router;
        setTimeout(function () {
            modal.destroy();
            Route.navigate(['/courses']);
        }, 1000);
    }
    _submitForm() {
        let classId = '', className = '', weektemp = [], weekdaytemp = [], classNumtemp = [], classPeoCount = '';
        classId = this.validateForm.controls['classId'].value;
        for (let j = 0; j < this.validateForm.controls['week'].value.length; j++) {
            weektemp.push(this.validateForm.controls['week'].value[j].value);
        }
        for (let j = 0; j < this.validateForm.controls['classNum'].value.length; j++) {
            classNumtemp.push(this.validateForm.controls['classNum'].value[j].value);
        }
        weekdaytemp[0] = this.validateForm.controls['weekday'].value.value;
        className = this.validateForm.controls['className'].value;
        classPeoCount = this.validateForm.controls['classPeoCount'].value;
        const data = {
            userName: this._storage.get('username'),
            classId: classId,
            className: className, // 课程
            classWeek: weektemp, // 周数
            weekDays: weekdaytemp, // 星期几
            classNum: classNumtemp, // 第几节
            classPeoCount: classPeoCount
        };
        this.addcourseService.executeHttp(this.curl[0], data)
            .then((result: any) => {
                const res = JSON.parse(result['_body']);
                if (res['result'] === 1) {
                    this.success();
                } else {
                    this.info('警告', '添加失败,请检查后重试！');
                    return;
                }
            });
    }
    private getData() {
        this.setInitWeek();
        // 获取学期
        this.addcourseService.executeGET(this.curl[1])
            .then((result: any) => {
                const res = JSON.parse(result['_body']);
                if (res['result'] === 'success') {
                    this.nowSemester = res['NowSemester'];
                }
            });
    }
    ngOnInit() {
        this.getData();
        this.validateForm = this.fb.group({
            classId: [null, [Validators.required]],
            className: [null, [Validators.required]],
            week: [null, [Validators.required]],
            weekday: [null, [Validators.required]],
            classNum: [null, [Validators.required]],
            classPeoCount: [null, [Validators.required]],
        });
    }
}
