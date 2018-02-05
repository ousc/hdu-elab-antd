///<reference path="../../../../../node_modules/@angular/forms/src/model.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {DetailService} from './detail.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {SessionStorageService} from '@core/storage/storage.module';

@Component({
  selector: 'detail',
  templateUrl: 'detail.component.html',
  styleUrls: ['./detail.component.less'],
  providers: [DetailService]
})
export class DetailComponent implements OnInit {
    constructor(private DetailService: DetailService,
                private _storage: SessionStorageService) {
    }
    userName = '40392';
    orderId = '';
    apiUrl = [
        'http://aliyun.charlesxu.cn:8080/LabManager/order/getOrderById', /*0获取预约*/
        'http://aliyun.charlesxu.cn:8080/LabManager/order/getFinishedSimpleOrderListByUsername', /*1获取通过预约*/
        'http://aliyun.charlesxu.cn:8080/LabManager/order/getUnfinishedSimpleOrderListByUsername', /*2获取未通过预约*/
    ];
    order = {};
    private _getData = () => {
        // 获取预约
        /*this.orderId = this.param.get('id');
        console.log(this.orderId);
        this.DetailService.getOrderDetail(this.apiUrl[0], parseInt(this.orderId, 0))
            .then((result: any) => {
                console.log(result['_body']);
                this.order = JSON.parse(result['_body'])['Order'];
                console.log(this.order);
            });*/
    }
    ngOnInit(): void {

    }

}
