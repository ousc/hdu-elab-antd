///<reference path="../../../../node_modules/@angular/forms/src/model.d.ts"/>
///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {YyglService} from './yygl.service';
import {Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {SessionStorageService} from '@core/storage/storage.module';
import {win} from '@angular/platform-browser/src/browser/tools/browser';

@Component({
    selector: 'Yygl',
    templateUrl: 'yygl.component.html',
    styleUrls: ['./yygl.component.less'],
    providers: [YyglService]
})

export class YyglComponent implements OnInit {
    _loading = true;
    _value = ''; /*搜索内容*/
    choice = 100; /*筛选条件:全部：100 进行中：0 未开始：0*/
    orderDetails = [];
    UnfinishOrder = [];
    orders = [];
    lab = [];
    /*接口地址*/
    apiUrl = [
        'http://aliyun.charlesxu.cn:8080/LabManager/order/getSimpleOrderByUsername', /*0获取预约*/
        'http://aliyun.charlesxu.cn:8080/LabManager/order/getOrderByUsername', /*1获取预约*/
        'http://aliyun.charlesxu.cn:8080/LabManager/order/getFinishedSimpleOrderListByUsername', /*2获取通过预约*/
        'http://aliyun.charlesxu.cn:8080/LabManager/order/getUnfinishedSimpleOrderListByUsername', /*3获取未通过预约*/
        'http://aliyun.charlesxu.cn:8080/LabManager/lab/getLabById',
        'http://aliyun.charlesxu.cn:8080/LabManager/order/deleteOrder',
    ];
    constructor(private yyglService: YyglService, private confirmServ: NzModalService, private  router: Router,
                private _storage: SessionStorageService) {
    }
    // 换星期几
    private getDayByNum(num: number) {
        const array = ['日', '一', '二', '三', '四', '五', '六', '日'];
        return array[num];
    }
    // 获得全部学时
    private getAllHour(orders: any) {
        let hour = 0;
        for (const i of orders) {
            for (const j of i.orderDetails) {
                hour += j.classNum.length  * j.orderWeek.length;
            }
        }
        return hour;
    }
    // 获得课程学时
    private getHour(order: any) {
        let hour = 0;
        for (const i of order) {
            hour += i.classNum.length * i.orderWeek.length;
        }
        return hour;
    }
    private boolArranged(pass: any) {
        if (pass === '未安排') {
            return true;
        } else if (pass === '安排失败') {
            return true;
        } else {
            return false;
        }
    }
    private _getData = () => {
        // 获取预约
        this._loading = true;
        this.yyglService.getOrders(this.apiUrl[1], this._storage.get('username'))
            .then((result: any) => {
                const data = JSON.parse(result['_body'])['Order'];
                for (const i of data) {
                    i.expand = false;
                }
                this.orders = data;
                this._loading = false;
            });
        // 获取未通过预约
        this.yyglService.getOrders(this.apiUrl[3], this._storage.get('username'))
            .then((result: any) => {
                this.UnfinishOrder = JSON.parse(result['_body'])['SimpleOrder'];
            });
    }
    private boolOpen(expand: boolean, data: any) {
        if (expand) {
            for (const d of data) {
                for (let i = 0; i < d.lab.length; i++) {
                    if (this.lab[d.lab[i]] == null) {
                    this.yyglService.getLab(this.apiUrl[4], d.lab[i])
                        .then((result: any) => {
                            const lab = JSON.parse(result['_body'])['lab'];
                            this.lab[d.lab[i]] = lab;
                        });
                    }
                }
            }
        }
        return expand;
    }
    // 获取实验室信息
    private getLabById (id: any) {
        this.yyglService.getLab(this.apiUrl[4], id)
            .then((result: any) => {
                const lab = JSON.parse(result['_body'])['lab'];
            });
    }
    // 删除预约
    private delOrder(id: any) {
        this.yyglService.delOrder(this.apiUrl[5], id)
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
    eidtOrder(id: number) {
        this._storage.set('orderId', id);

    }
    onSearch(event: string): void {
        console.log(event);
    }
    ngOnInit(): void {
        this._getData();
    }
}

