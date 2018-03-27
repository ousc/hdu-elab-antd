///<reference path="../../../../node_modules/@angular/forms/src/model.d.ts"/>
///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {OrderManageService} from './orderManage.service';
import {Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {SessionStorageService} from '@core/storage/storage.module';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'OrderManage',
    templateUrl: 'orderManage.component.html',
    styleUrls: ['./orderManage.component.less'],
    providers: [OrderManageService]
})

export class OrderManageComponent implements OnInit {
    validateForm: FormGroup;
    constructor(private orderManageService: OrderManageService, private confirmServ: NzModalService, private  router: Router,
                private _storage: SessionStorageService, private fb: FormBuilder) {
    }
    _loading = true;
    _value = ''; /*搜索内容*/
    choice = 100; /*筛选条件:全部：100 进行中：0 未开始：0*/
    orderDetails = [];
    UnfinishOrder = [];
    orders = [];
    lab = [];
    user;
    /*接口地址*/
    apiUrl = [
        'http://aliyun.charlesxu.cn:8080/LabManager/order/getSimpleOrderByUsername', /*0获取预约*/
        'http://aliyun.charlesxu.cn:8080/LabManager/order/getOrderByUsername', /*1获取预约*/
        'http://aliyun.charlesxu.cn:8080/LabManager/order/getFinishedSimpleOrderListByUsername', /*2获取通过预约*/
        'http://aliyun.charlesxu.cn:8080/LabManager/order/getUnfinishedSimpleOrderListByUsername', /*3获取未通过预约*/
        'http://aliyun.charlesxu.cn:8080/LabManager/lab/getLabById', // 4
        'http://aliyun.charlesxu.cn:8080/LabManager/order/deleteOrder', // 5
        'http://aliyun.charlesxu.cn:8080/LabManager/user/getUserByUserName', // 6
        'http://aliyun.charlesxu.cn:8080/LabManager/order/semester/getOrderByUsername', // 7
        'http://aliyun.charlesxu.cn:8080/LabManager/order/semester/getSimpleOrderByUserName', // 8
        'http://aliyun.charlesxu.cn:8080/LabManager/semester/getNowSemester', // 9
    ];
    options = [
        { value: '2016', label: '2016' },
        { value: '2017', label: '2017' },
        { value: '2018', label: '2018' },
        { value: '2019', label: '2019' },
    ];
    // 获取学期
    nowSemester = {
        nowSemester: '',
        maxWeek: 17
    };
    private getSemester() {
            this.orderManageService.executeGET(this.apiUrl[9])
                .then((result: any) => {
                    const res = JSON.parse(result['_body']);
                    if (res['result'] === 'success') {
                        this.nowSemester = res['NowSemester'];
                    }
                });
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
        this.getSemester();
        // 获取预约
        this._loading = true;
        this.orderManageService.executeHttp(this.apiUrl[1], {userName: this._storage.get('username')})
            .then((result: any) => {
                const data = JSON.parse(result['_body'])['Order'];
                for (const i of data) {
                    i.expand = false;
                }
                this.orders = data;
                this._loading = false;
            });
        // 获取未通过预约
        this.orderManageService.executeHttp(this.apiUrl[3], {userName: this._storage.get('username')})
            .then((result: any) => {
                this.UnfinishOrder = JSON.parse(result['_body'])['SimpleOrder'];
            });
    }
    // 展开预约详情
    private boolOpen(expand: boolean, data: any) {
        if (expand) {
            for (const d of data) {
                for (let i = 0; i < d.lab.length; i++) {
                    if (this.lab[d.lab[i]] == null) {
                    this.orderManageService.executeHttp(this.apiUrl[4], {labId: d.lab[i]})
                        .then((result: any) => {
                            const lab = JSON.parse(result['_body'])['lab'];
                            this.lab[d.lab[i]] = lab;
                            this.orderManageService.executeHttp(this.apiUrl[6], {userName: this.lab[d.lab[i]].userName})
                                .then((res: any) => {
                                    const admin = JSON.parse(res['_body'])['User1'];
                                    this.lab[d.lab[i]].email = admin.email;
                                    this.lab[d.lab[i]].phone = admin.phone;
                                });
                        });
                    }
                }
            }
        }
        return expand;
    }
    // 删除预约
    private delOrder(id: any) {
        this.orderManageService.executeHttp(this.apiUrl[5], {id: id})
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
    // 获取历史预约
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
                _storage.set('history', str);
                Route.navigate(['/orders/history']);
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
    ngOnInit(): void {
        this.validateForm = this.fb.group({
            fy: [null, this.validateForm],
            sy: [null, this.validateForm],
            type: [null, this.validateForm]
        });
        this._getData();
    }
}

