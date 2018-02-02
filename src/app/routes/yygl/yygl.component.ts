///<reference path="../../../../node_modules/@angular/forms/src/model.d.ts"/>
///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {YyglService} from './yygl.service';
import {Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {UserService} from '../user/user.service';

@Component({
  selector: 'Yygl',
  templateUrl: 'yygl.component.html',
  styleUrls: ['./yygl.component.less'],
  providers: [YyglService]
})

export class YyglComponent implements OnInit {
    _value = ''; /*搜索内容*/
    choice = 100; /*筛选条件:全部：100 进行中：0 未开始：0*/
    /*预约情况：预约课程数，已预约学时，待通过预约数*/
    orders = { orderednum : 3 , orderedhour: 64, ordering: 3};
    /*预约列表*/
    constructor(private yyglService: YyglService, private message: NzMessageService, private modalService: NzModalService) {
    }
    data = [];
    /*data = [
        {
            id: 1,
            course    : '', /!*课程名称*!/
            coursetime : '', /!*课程时间*!/
            orderedhour : 16, /!*已预约学时*!/
            ordertime:  '', /!*预约提交时间*!/
            progress : '',
        }
    ];*/
    private _getData = () => {
        this.yyglService.getOrderList()
            .then((result: any) => {
                const { data } = result;
                this.data = data;
            });
        this.yyglService.getOrder()
            .then((result: any) => {
                const {data} = result;
                this.orders = data;
            });
    }

    ngOnInit(): void {
        this._getData();
    }
    onSearch(event: string): void {
        console.log(event);
    }
}

