///<reference path="../../../../../node_modules/@angular/forms/src/model.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {DetailService} from './detail.service';
import {SessionStorageService} from '@core/storage/storage.module';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'detail',
    templateUrl: 'detail.component.html',
    styleUrls: ['./detail.component.less'],
    providers: [DetailService]
})
export class DetailComponent implements OnInit {
    validateForm: FormGroup;
    constructor(private DetailService: DetailService, private fb: FormBuilder,
                private _storage: SessionStorageService) {
    }
    apiUrl = [
        'http://aliyun.charlesxu.cn:8080/LabManager/order/getOrderById',
    ];
    order = {};
    private _getData = () => {
        // 获取预约
        const orderId = this._storage.get('orderId');
        this.DetailService.getOrderDetail(this.apiUrl[0], parseInt(orderId, 0))
            .then((result: any) => {
                this.order = JSON.parse(result['_body'])['Order'];
            });
    }
    ngOnInit(): void {
        this._getData();
        if (this.order !== null) {
            this._storage.remove('orderId');
        }
        this.validateForm = this.fb.group({
        });
    }

}
