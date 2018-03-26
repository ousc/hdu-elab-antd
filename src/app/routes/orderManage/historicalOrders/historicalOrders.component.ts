import {Component, OnInit} from '@angular/core';
import {HistoricalOrdersService} from './historicalOrders.service';
import {NzMessageService, NzModalService, NzModalSubject} from 'ng-zorro-antd';
import {SessionStorageService} from '@core/storage/storage.module';
import {Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {OrderManageService} from '../orderManage.service';

@Component({
  selector: 'app-HistorcalOrders',
  templateUrl: 'historicalOrders.component.html',
  styleUrls: ['./historicalOrders.component.less'],
  providers: [HistoricalOrdersService]
})

export class HistoricalOrdersComponent implements OnInit {
    constructor(private historicalOrdersService: HistoricalOrdersService, private  router: Router,
                private confirmServ: NzModalService, private _storage: SessionStorageService) {
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
        'http://aliyun.charlesxu.cn:8080/LabManager/semester/getNowSemester', /*0*/
        'http://aliyun.charlesxu.cn:8080/LabManager/order/semester/getOrderByUsername', /*1获取预约*/
        'http://aliyun.charlesxu.cn:8080/LabManager/order/semester/getFinishedSimpleOrderListByUsername', /*2获取通过预约*/
        'http://aliyun.charlesxu.cn:8080/LabManager/order/semester/getUnfinishedSimpleOrderListByUsername', /*3获取未通过预约*/
        'http://aliyun.charlesxu.cn:8080/LabManager/lab/getLabById', // 4
        'http://aliyun.charlesxu.cn:8080/LabManager/user/getUserByUserName', // 5
    ];
    // 获取学期
  searchSemester = this._storage.get('history');
    nowSemester;
    private getSemester() {
          this.historicalOrdersService.executeGET(this.apiUrl[0])
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
    private _getData = () => {
        this.getSemester();
        // 获取预约
        this._loading = true;
        let data = {
          userName: this._storage.get('username'),
          semester: this.searchSemester
        }
        this.historicalOrdersService.executeHttp(this.apiUrl[1], data)
            .then((result: any) => {
                this.orders = JSON.parse(result['_body'])['Order'];
                for (let i of this.orders) {
                    i.expand = false;
                }
                console.log(this.orders);
            });
        this._loading = false;
        // 获取未通过预约
        this.historicalOrdersService.executeHttp(this.apiUrl[3], data)
            .then((result: any) => {
                this.UnfinishOrder = JSON.parse(result['_body'])['SimpleOrder'];
                console.log(this.UnfinishOrder);
            });
    }
    private boolOpen(expand: boolean, data: any) {
        if (expand) {
            for (const d of data) {
                for (let i = 0; i < d.lab.length; i++) {
                    if (this.lab[d.lab[i]] == null) {
                        this.historicalOrdersService.executeHttp(this.apiUrl[4], {labId: d.lab[i]})
                            .then((result: any) => {
                                const lab = JSON.parse(result['_body'])['lab'];
                                this.lab[d.lab[i]] = lab;
                                console.log(lab);
                                console.log(this.lab[d.lab[i]].adminName);
                                console.log(this.lab);
                                this.historicalOrdersService.executeHttp(this.apiUrl[6], {userName: '40392'})
                                    .then((res: any) => {
                                        const admin = JSON.parse(res['_body'])['User1'];
                                        this.user = admin;
                                    });
                            });
                    }
                }
            }
        }
        return expand;
    }
    ngOnInit(): void {
        this._getData();
    }
}
