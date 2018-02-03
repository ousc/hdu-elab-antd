///<reference path="../../../../node_modules/@angular/forms/src/model.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {OrderService} from './order.service';
import {Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {SessionStorageService} from "@core/storage/storage.service";
import {current} from "codelyzer/util/syntaxKind";

@Component({
    selector: 'app-order',
    templateUrl: 'order.component.html',
    styleUrls: ['./order.component.less'],
    providers: [OrderService]
})

export class OrderComponent implements OnInit {
    constructor(private _storage : SessionStorageService,private confirmServ: NzModalService,private fb: FormBuilder, private orderService: OrderService, private router: Router, private _message: NzMessageService) {
    }
    validateForm: FormGroup;//定义表单验证
    loadStatus: boolean;//加载状况
    labdata = [[],[],[]];
    //获取的实验室信息
    zhiyuandata = [[],[],[]];
    submitBtn = '下一步';
    submitBackBtn = '上一步';
    current = 0;//初始化步骤
    zhiyuan2  = false;//初始志愿2表单为关闭状态
    zhiyuan3  = false;//初始志愿3表单为关闭状态
    course = [
        { value: '101123123', label: '数据结构课程设计{周一345节 1-17周}',className:'数据结构课程设计',teacherId:'12332123',classPeoCount:120 },
        { value: '101123124', label: '数据结构课程设计{周一456节 1-17周}',className:'数据结构课程设计',teacherId:'12332123',classPeoCount:120 },
        { value: '101123125', label: '数据结构课程设计{周一678节 1-17周}',className:'数据结构课程设计',teacherId:'12332123',classPeoCount:120 }
    ];//课程信息
    week = [{ value:1, label: '1' },
        { value:2, label: '2' },
        { value:3, label: '3' },
        { value:4, label: '4' },
        { value:5, label: '5' },
        { value:6, label: '6' },
        { value:7, label: '7' },
        { value:8, label: '8' },
        { value:9, label: '9' },
        { value:10, label: '10' },
        { value:11, label: '11' },
        { value:12, label: '12' },
        { value:13, label: '13' },
        { value:14, label: '14' },
        { value:15, label: '15' },
        { value:16, label: '16' },
        { value:17, label: '17' },
        { value:18, label: '18' },
        { value:19, label: '19' },
        { value:20, label: '20' },
        { value:21, label: '21' },
        { value:22, label: '22' },
        { value:23, label: '23' },
        { value:24, label: '24' },
        { value:25, label: '25' },
    ];//周数
    weekday = [{ value:1, label: '星期一' },
        { value:2, label: '星期二' },
        { value:3, label: '星期三' },
        { value:4, label: '星期四' },
        { value:5, label: '星期五' },
        { value:6, label: '星期六' },
        { value:7, label: '星期日' }
    ];//星期
    classNum = [{ value:1, label: '第1节' },
        { value:2, label: '第2节' },
        { value:3, label: '第3节' },
        { value:4, label: '第4节' },
        { value:5, label: '第5节' },
        { value:6, label: '第6节' },
        { value:7, label: '第7节' },
        { value:8, label: '第8节' },
        { value:9, label: '第9节' },
        { value:10, label: '第10节' },
        { value:11, label: '第11节' },
        { value:12, label: '第12节' },
    ];//节数
    type = [
        { value:'1', label: '计算机房1' },
        { value:'2', label: '计算机房2' },
    ];//类型
    info(title,contentTpl) {
        this.confirmServ.info({
            title: title,
            content: contentTpl
        });
    }//警告框
    success = () => {
        const modal = this.confirmServ.success({
            title: '提交成功',
            content: '3秒后回到首页'
        });
        setTimeout(function () {
            modal.destroy();
            window.location.assign('/');
        },3000);

    };
    lastData = {
        classId:null,
        className:null,
        classpeoCount:null,
        username:null,
        orderDetails:[{
            type:null,
            orderWeek:[],
            weekDays:[],
            classNum:[],
            lab:[],
            labPeoCount:[]
        },{
            type:null,
            orderWeek:[],
            weekDays:[],
            classNum:[],
            lab:[],
            labPeoCount:[]
        },{
            type:null,
            orderWeek:[],
            weekDays:[],
            classNum:[],
            lab:[],
            labPeoCount:[]
        }]
    };
    submit(n): void {
        let url = ['https://www.easy-mock.com/mock/5a5b5ba932a4fc7429df228a/lab1',
            'https://www.easy-mock.com/mock/5a5b5ba932a4fc7429df228a/resultsuccess'];//改为接口地址
        switch (n) {
            case 0: {
                for (let i = 1; i < 4; i++) {
                    if (i == 2 && this.zhiyuan2 == false) continue;
                    if (i == 3 && this.zhiyuan3 == false) continue;
                    let weektemp = [], weekdaytemp = [], classNumtemp = [], coursetemp = [], typetemp=[];
                    for (let j = 0; j < this.validateForm.controls['week' + i].value.length; j++) {
                        weektemp.push(this.validateForm.controls['week' + i].value[j].value);
                    }
                    for (let j = 0; j < this.validateForm.controls['classNum' + i].value.length; j++) {
                        classNumtemp.push(this.validateForm.controls['classNum' + i].value[j].value);
                    }
                    weekdaytemp[0] = this.validateForm.controls['weekday' + i].value.value;
                    coursetemp[0] = this.validateForm.controls['course'].value.value;
                    typetemp[0] = this.validateForm.controls['type' + i].value.value;
                    let data = {
                        course: coursetemp,//课程
                        week: weektemp,//周数
                        weekday: weekdaytemp,//星期几
                        classNum: classNumtemp,//第几节
                        type: typetemp//种类
                    };
                    this.lastData.classId = this.validateForm.controls['course'].value.value;
                    this.lastData.className = this.validateForm.controls['course'].value.className;
                    this.lastData.classpeoCount = this.validateForm.controls['course'].value.classPeoCount;
                    this.lastData.username = this._storage.get('username');
                    this.orderService.executeHttp(url[n],{username:this._storage.get('username'),data:data,no:i}).then((result: any) => {
                        let res = JSON.parse(result['_body']);
                        if(res['result']!='success'){
                            this.info('警告','志愿'+i+'提交失败,请检查网络连接后重试！');
                            return;
                        }else{
                            for(let k=0;k<res['lab'].length;k++){
                                res['lab']['checked']=false;
                                res['lab']['PeoCount']=0;
                                res['zhiyuan'] = k+1;
                                this.labdata[i-1].push(res['lab'][k]);
                            }
                        }
                    });
                }
                this.current += 1;
                this.submitBtn = '下一步';
                break;
            }//第一步提交完成
            case 1: {
                this.zhiyuandata = [[],[],[]];
                for (let i = 0; i < this.labdata.length; i++)
                    for(let j=0; j < this.labdata[i].length;j++)
                    if (this.labdata[i][j].checked) {
                        this.zhiyuandata[i].push(this.labdata[i][j]);
                    }
                if (this.zhiyuandata[0].length == 0) {
                    this.info('警告','请至少选择一个实验室！');
                    this.submitBtn = '下一步';
                    break;
                }
                this.current += 1;
                this.submitBtn = '下一步';
                break;
            }//第二步提交完成
            case 2:{
                for (let i = 0; i < this.zhiyuandata.length; i++) {
                    let peocountsum = 0;
                    if (this.zhiyuandata[i].length==0) continue;
                    for (let j = 0; j < this.zhiyuandata[i].length; j++){
                        if (this.zhiyuandata[i][j].checked) {
                            peocountsum += this.zhiyuandata[i][j].PeoCount;
                        }
                    }
                    if(peocountsum!=this.lastData.classpeoCount){
                        this.info('警告','预约实验室人数必须等于班级总人数！');
                        return;
                    }
                }
                //信息总结：
                //志愿1
                this.lastData.orderDetails[0].type=this.validateForm.controls['type1'].value.value;
                for (let j = 0; j < this.validateForm.controls['week1'].value.length; j++) {
                    this.lastData.orderDetails[0].orderWeek.push(this.validateForm.controls['week1'].value[j].value);
                }
                this.lastData.orderDetails[0].weekDays=this.validateForm.controls['weekday1'].value.value;
                for (let j = 0; j < this.validateForm.controls['classNum1'].value.length; j++) {
                    this.lastData.orderDetails[0].classNum.push(this.validateForm.controls['classNum1'].value[j].value);
                }
                for(let i=0;i<this.zhiyuandata[0].length;i++){
                    this.lastData.orderDetails[0].lab.push(this.zhiyuandata[0][i].id);
                    this.lastData.orderDetails[0].labPeoCount.push(this.zhiyuandata[0][i].PeoCount);
                }
                if(this.zhiyuan2!=false){
                    this.lastData.orderDetails[1].type=this.validateForm.controls['type2'].value.value;
                    for (let j = 0; j < this.validateForm.controls['week2'].value.length; j++) {
                        this.lastData.orderDetails[1].orderWeek.push(this.validateForm.controls['week2'].value[j].value);
                    }
                    this.lastData.orderDetails[1].weekDays=this.validateForm.controls['weekday2'].value.value;
                    for (let j = 0; j < this.validateForm.controls['classNum2'].value.length; j++) {
                        this.lastData.orderDetails[1].classNum.push(this.validateForm.controls['classNum2'].value[j].value);
                    }
                    for(let i=0;i<this.zhiyuandata[1].length;i++){
                        this.lastData.orderDetails[1].lab.push(this.zhiyuandata[1][i].id);
                        this.lastData.orderDetails[1].labPeoCount.push(this.zhiyuandata[1][i].PeoCount);
                    }
                }
                if(this.zhiyuan3!=false){
                    this.lastData.orderDetails[2].type=this.validateForm.controls['type3'].value.value;
                    for (let j = 0; j < this.validateForm.controls['week3'].value.length; j++) {
                        this.lastData.orderDetails[2].orderWeek.push(this.validateForm.controls['week3'].value[j].value);
                    }
                    this.lastData.orderDetails[2].weekDays=this.validateForm.controls['weekday3'].value.value;
                    for (let j = 0; j < this.validateForm.controls['classNum3'].value.length; j++) {
                        this.lastData.orderDetails[2].classNum.push(this.validateForm.controls['classNum3'].value[j].value);
                    }
                    for(let i=0;i<this.zhiyuandata[2].length;i++){
                        this.lastData.orderDetails[2].lab.push(this.zhiyuandata[2][i].id);
                        this.lastData.orderDetails[2].labPeoCount.push(this.zhiyuandata[2][i].PeoCount);
                    }
                }
                this.current += 1;
                this.submitBtn = '下一步';
                break;
            }//第三步提交完成
            case 3:{
                this.orderService.executeHttp(url[1],JSON.stringify(this.lastData)).then((result: any) => {
                    let res = JSON.parse(result['_body']);
                    if(res["result"]=="success"){
                         this.success();
                    }
                })
            }
        }
    }

    _submitForm() {
        if(this.zhiyuan2==false){
            this.validateForm.controls['week2'].reset();
            this.validateForm.controls['weekday2'].reset();
            this.validateForm.controls['classNum2'].reset();
            this.validateForm.controls['type3'].reset();
            let c = this.validateForm.value;
            c['week2']=[{value:-1,"label":" "}];
            c['weekday2']={value:-1,"label":" "};
            c['classNum2']=[{value:-1,"label":" "}];
            c['type2']=-1;
            this.validateForm.setValue(c);
        }
        if(this.zhiyuan3==false){
            this.validateForm.controls['week3'].reset();
            this.validateForm.controls['weekday3'].reset();
            this.validateForm.controls['classNum3'].reset();
            this.validateForm.controls['type3'].reset();
            let c = this.validateForm.value;
            c['week3']=[{value:-1,"label":" "}];
            c['weekday3']={value:-1,"label":" "};
            c['classNum3']=[{value:-1,"label":" "}];
            c['type3']=-1;
            this.validateForm.setValue(c);
        }
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[i].markAsDirty();
        }
        if (this.validateForm.valid) {
            this.loadStatus = true;
            this.submitBtn = '提交中...';
            this.submit(this.current);
            this.loadStatus = false;
        }
    }
    back(){
        if(this.current==1){
            this.labdata = [[],[],[]];
        }
        this.loadStatus = true;
        this.current-=1;
        this.loadStatus = false;
    }
    //控制全选单双重置
    setWeek = (target, operation) => {
        this.validateForm.controls[target].reset();
        if(operation==0){
            let c = this.validateForm.value;
            c[target] = this.week;
            this.validateForm.setValue(c);
        }
        if(operation==1){
            let c = this.validateForm.value;
            c[target] = [];
            for(let i=0;i< this.week.length;i++){
                if(i%2==0){
                    c[target].push(this.week[i]);
                }
            }
            this.validateForm.setValue(c);
        }
        if(operation==2){
            let c = this.validateForm.value;
            c[target] = [];
            for(let i=0;i< this.week.length;i++){
                if(i%2){
                    c[target].push(this.week[i]);
                }
            }
            this.validateForm.setValue(c);
        }
    };
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
    ngOnInit() {
        this.validateForm = this.fb.group({
            course: ['', [Validators.required]],
            week1: [null, [Validators.required]],
            week2: [null, [Validators.required]],
            week3: [null, [Validators.required]],
            weekday1:[null, [Validators.required]],
            weekday2:[null, [Validators.required]],
            weekday3:[null, [Validators.required]],
            classNum1:[null, [Validators.required]],
            classNum2:[null, [Validators.required]],
            classNum3:[null, [Validators.required]],
            type1:[null, [Validators.required]],
            type2:[null, [Validators.required]],
            type3:[null, [Validators.required]],
        });
    }
}
