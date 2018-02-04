///<reference path="../../../../node_modules/@angular/forms/src/model.d.ts"/>
///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {YyglService} from './yygl.service';
import {Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {UserService} from '../user/user.service';
import {SessionStorageService} from '@core/storage/storage.module';

@Component({
  selector: 'Yygl',
  templateUrl: 'yygl.component.html',
  styleUrls: ['./yygl.component.less'],
  providers: [YyglService]
})

export class YyglComponent implements OnInit {
    ngOnInit(): void {
        this._getData();
    }
    _value = ''; /*搜索内容*/
    choice = 100; /*筛选条件:全部：100 进行中：0 未开始：0*/
    /*预约情况：预约课程数，已预约学时，待通过预约数*/
    orders = {};
    /*预约列表*/
    constructor(private yyglService: YyglService, private confirmServ: NzMessageService,
                private modalService: NzModalService, private _storage: SessionStorageService) {
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
    private orderlisturl = 'https://www.easy-mock.com/mock/5a73c90cb4ec7020fa2f63e8/yygl';
    private _getData = () => {
        this.yyglService.getOrder()
            .then((result: any) => {
                const {data} = result;
                this.orders = data;
            });
        this.yyglService.executeHttp(this.orderlisturl, {username: this._storage.get('username')})
            .then((result: any) => {
                console.log(result);
                this.data = result['data'];
                /*let res = JSON.parse(result['body']);
                console.log(res);
                if (res['result'] !== 'success') {
                console.log('失败');
                return;
                }*/
        });
    /*    this.yyglService.getOrderList()
            .then((result: any) => {
                const { data } = result;
                this.data = data;
            });*/
    }
    onSearch(event: string): void {
        console.log(event);
    }
}

