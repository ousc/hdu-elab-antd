///<reference path="../../../../node_modules/@angular/forms/src/model.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {OrderService} from './order.service';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {SessionStorageService} from "@core/storage/storage.service";
import {isUndefined} from "util";

function NumAscSort(a,b) {return a - b;}//排序算法，升序

@Component({
    selector: 'app-order',
    templateUrl: 'order.component.html',
    styleUrls: ['./order.component.less'],
    providers: [OrderService]
})
export class OrderComponent implements OnInit {
    constructor(private _storage : SessionStorageService,private confirmServ: NzModalService,private fb: FormBuilder, private orderService: OrderService, private _message: NzMessageService) {
    }
    //************************************************
    // 变量定义部分
    validateForm: FormGroup;//定义表单验证
    loadStatus: boolean;//加载状况
    labdata = [[],[],[]];//获取的实验室信息
    rweek = ['一','二','三','四','五','六','日',];//周几汉字
    zhiyuandata = [[],[],[]];//转存的志愿实验室信息，三个数组分别储存一、二、三志愿
    submitBtn = '下一步';//下一步按钮文字
    submitBackBtn = '上一步';//上一步按钮文字
    current = 0;//初始化步骤
    zhiyuan2  = false;//初始志愿2表单为关闭状态
    zhiyuan3  = false;//初始志愿3表单为关闭状态
    course = [];//课程信息
    courseStatus = [{},{},{}];
    type = [];//实验室种类
    week = [{ value:1, label: '1' },//value为绑定值，label为显示内容
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

    lastData = {
        classId:null,//课程号
        className:null,//课程名
        classPeoCount:null,//班级人数
        userName:null,//用户名
        passFlagString:"未安排",
        remark:null,
        orderDetails:[{
            type:1,//第几志愿
            orderWeek:[],//预定周次
            weekDays:[],//星期几
            classNum:[],//第几节
            lab:[],//实验室
            labArrangedPeoCount:[]//和lab对应的实验室安排人数
        },{
            type:2,
            orderWeek:[],
            weekDays:[],
            classNum:[],
            lab:[],
            labArrangedPeoCount:[]
        },{
            type:3,
            orderWeek:[],
            weekDays:[],
            classNum:[],
            lab:[],
            labArrangedPeoCount:[]
        }]
    };//第四步提交的最终数据格式
    //************************************************
    //方法定义
    //1.获取实验室类型
    getType(){
        this.orderService.executeGET("lab/getAllLabType").then((result: any) => {
            let res = JSON.parse(result['_body'])["labType"];
            for(let i=0;i<res.length;i++){
                this.type.push({value:res[i],label:res[i]})
            }
        })
    }
    //2.获取课程内容
    getCourse(){
        this.orderService.executeHttp("class/getclassbyusername",{userName: this._storage.get('username')}).then((result: any) => {
            let res = JSON.parse(result['_body']);
            for(let i=0;i<res['course'].length;i++){
                res['course'][i]['value'] = res['course'][i]['classId'];
                res['course'][i]['label'] = res['course'][i]['className']+"{周"+this.rweek[res['course'][i]["weekDays"][0]-1]+res["course"][i]["classNumString"]+"节 "+ res["course"][i]["classWeek"][0]+"-"+res["course"][i]["classWeek"][res["course"][i]["classWeek"].length-1]+"周}";
                res['course'][i]['teacherId'] = res['course'][i]['userName'];
                this.course.push(res['course'][i]);
            }
        })
    }
    //4.第三部提交成功的alert窗口
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
    //5.下一步/提交
    submit(n): void {
        let url = ['lab/getLabByType',
            'order/addOrder'];//定义接口地址
        switch (n) {
            case 0: {
                if(this.zhiyuan2==false&&this.zhiyuan3==true){
                    this._message.error("请先填写第二志愿再填写第三志愿");
                    return;
                }//检测是否没填第二志愿直接填写第三志愿
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
                    for (let j = 0; j < this.validateForm.controls['type' + i].value.length; j++) {
                        typetemp.push(this.validateForm.controls['type' + i].value[j].value);
                    }
                    weekdaytemp[0] = this.validateForm.controls['weekday' + i].value.value;
                    coursetemp[0] = this.validateForm.controls['course'].value.value;
                    let data = {
                        course: coursetemp,//课程
                        week: weektemp,//周数
                        weekday: weekdaytemp,//星期几
                        classNum: classNumtemp,//第几节
                        type: typetemp//种类
                    };
                    this.lastData.classId = this.validateForm.controls['course'].value.value;
                    this.lastData.className = this.validateForm.controls['course'].value.className;
                    this.lastData.classPeoCount = this.validateForm.controls['course'].value.classPeoCount;
                    this.lastData.userName = this._storage.get('username');
                    this.orderService.executeHttp(url[n],{username:this._storage.get('username'),data:data,no:i}).then((result: any) => {
                        let res = JSON.parse(result['_body']);
                        if(res['result']!='success'){
                            this._message.error('志愿'+i+'提交失败,请检查网络连接后重试！');
                            return;
                        }else{
                            for(let k=0;k<res['lab'].length;k++){
                                res['lab']['checked']=false;
                                res['lab']['PeoCount']=0;
                                res['zhiyuan'] = k+1;
                                this.labdata[i-1].push(res['lab'][k]);
                            }
                        }
                    });//提交志愿并将返回数据储存进labdata中
                }
                this.current += 1;
                this.submitBtn = '下一步';
                break;
            }//第一步提交完成
            case 1: {
                this.zhiyuandata = [[],[],[]];//重置数据
                for (let i = 0; i < this.labdata.length; i++){
                    for(let j=0; j < this.labdata[i].length;j++){
                        if (this.labdata[i][j].checked) {
                            this.zhiyuandata[i].push(this.labdata[i][j]);
                        }
                    }
                }//将用户勾选的数据放进zhiyaundata中，zhiyuandata0、1、2分别对应1、2、3志愿
                for(let i=0;i<3;i++){
                    if ((this["zhiyuan"+(i+1)]==true&&this.zhiyuandata[i].length == 0)||(i==0&&this.zhiyuandata[i].length == 0)) {
                        this._message.error('每一志愿请至少选择一个实验室！');
                        this.submitBtn = '下一步';
                        return;
                    }//检测是否没有勾选实验室
                    if (this.zhiyuandata[i].length > 3) {
                        this._message.error("每一志愿最多可选择3个实验室！");
                        this.submitBtn = '下一步';
                        return;
                    }//检测是否勾选超过3个实验室!
                }
                this.current += 1;
                this.submitBtn = '下一步';
                break;
            }//第二步提交完成
            case 2:{
                this.lastData.orderDetails = [{
                    type:1,
                    orderWeek:[],
                    weekDays:[],
                    classNum:[],
                    lab:[],
                    labArrangedPeoCount:[]
                },{
                    type:2,
                    orderWeek:[],
                    weekDays:[],
                    classNum:[],
                    lab:[],
                    labArrangedPeoCount:[]
                },{
                    type:3,
                    orderWeek:[],
                    weekDays:[],
                    classNum:[],
                    lab:[],
                    labArrangedPeoCount:[]
                }];//重置lastdata
                for (let i = 0; i < this.zhiyuandata.length; i++) {
                    let peocountsum = 0;//重置人数
                    if (this.zhiyuandata[i].length==0) continue;
                    for (let j = 0; j < this.zhiyuandata[i].length; j++){
                        if (this.zhiyuandata[i][j].checked) {
                            peocountsum += this.zhiyuandata[i][j].PeoCount;
                        }
                    }
                    if(peocountsum!=this.lastData.classPeoCount){
                        this._message.error('预约实验室人数必须等于班级总人数！');
                        return;
                    }//检测预约实验室人数是否等于班级总人数
                }
                //信息总结：
                //志愿1
                for (let j = 0; j < this.validateForm.controls['week1'].value.length; j++) {
                    this.lastData.orderDetails[0].orderWeek.push(this.validateForm.controls['week1'].value[j].value);
                }
                this.lastData.orderDetails[0].orderWeek.sort(NumAscSort);
                this.lastData.orderDetails[0].weekDays.push(this.validateForm.controls['weekday1'].value.value);
                for (let j = 0; j < this.validateForm.controls['classNum1'].value.length; j++) {
                    this.lastData.orderDetails[0].classNum.push(this.validateForm.controls['classNum1'].value[j].value);
                }
                this.lastData.orderDetails[0].classNum.sort(NumAscSort);
                for(let i=0;i<this.zhiyuandata[0].length;i++){
                    this.lastData.orderDetails[0].lab.push(this.zhiyuandata[0][i].id);
                    this.lastData.orderDetails[0].labArrangedPeoCount.push(this.zhiyuandata[0][i].PeoCount);
                }
                if(this.zhiyuandata[1].length!=0){
                    for (let j = 0; j < this.validateForm.controls['week2'].value.length; j++) {
                        this.lastData.orderDetails[1].orderWeek.push(this.validateForm.controls['week2'].value[j].value);
                    }
                    this.lastData.orderDetails[1].orderWeek.sort(NumAscSort);
                    this.lastData.orderDetails[1].weekDays.push(this.validateForm.controls['weekday2'].value.value);
                    for (let j = 0; j < this.validateForm.controls['classNum2'].value.length; j++) {
                        this.lastData.orderDetails[1].classNum.push(this.validateForm.controls['classNum2'].value[j].value);
                    }
                    this.lastData.orderDetails[1].classNum.sort(NumAscSort);
                    for(let i=0;i<this.zhiyuandata[1].length;i++){
                        this.lastData.orderDetails[1].lab.push(this.zhiyuandata[1][i].id);
                        this.lastData.orderDetails[1].labArrangedPeoCount.push(this.zhiyuandata[1][i].PeoCount);
                    }
                }
                if(this.zhiyuandata[2].length!=0){
                    for (let j = 0; j < this.validateForm.controls['week3'].value.length; j++) {
                        this.lastData.orderDetails[2].orderWeek.push(this.validateForm.controls['week3'].value[j].value);
                    }
                    this.lastData.orderDetails[2].orderWeek.sort(NumAscSort);
                    this.lastData.orderDetails[2].weekDays.push(this.validateForm.controls['weekday3'].value.value);
                    for (let j = 0; j < this.validateForm.controls['classNum3'].value.length; j++) {
                        this.lastData.orderDetails[2].classNum.push(this.validateForm.controls['classNum3'].value[j].value);
                    }
                    this.lastData.orderDetails[2].classNum.sort(NumAscSort);
                    for(let i=0;i<this.zhiyuandata[2].length;i++){
                        this.lastData.orderDetails[2].lab.push(this.zhiyuandata[2][i].id);
                        this.lastData.orderDetails[2].labArrangedPeoCount.push(this.zhiyuandata[2][i].PeoCount);
                    }
                }//将zhiyaundata的数据放入lastdata
                this.current += 1;
                this.submitBtn = '下一步';
                break;
            }//第三步提交完成
            case 3:{
                if(this.lastData.remark==null||this.lastData.remark==''){
                    this._message.error('备注不能为空！');
                    return;
                }
                this.orderService.executeHttp(url[1],this.lastData).then((result: any) => {
                    let res = JSON.parse(result['_body']);
                    if(res["result"]==1){
                         this.success();
                    }
                })
            }//第四步提交完成
        }
    }
    //6.提交第一张表单的表单验证
    _submitForm() {
        if(this.zhiyuan2==false){
            this.validateForm.controls['week2'].reset();
            this.validateForm.controls['weekday2'].reset();
            this.validateForm.controls['classNum2'].reset();
            this.validateForm.controls['type2'].reset();
            let c = this.validateForm.value;
            c['week2']=[{value:-1,"label":" "}];
            c['weekday2']={value:-1,"label":" "};
            c['classNum2']=[{value:-1,"label":" "}];
            c['type2']=[{value:'',"label":" "}];
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
            c['type3']=[{value:'',"label":" "}];
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

    //7.返回上一步
    back(){
        this.courseStatus=[{},{},{}];
        if(this.current==1){
            this.labdata = [[],[],[]];
        }
        if(this.zhiyuan2==false){
            this.validateForm.controls['week2'].reset();
            this.validateForm.controls['weekday2'].reset();
            this.validateForm.controls['classNum2'].reset();
            this.validateForm.controls['type2'].reset();
        }
        if(this.zhiyuan3==false){
            this.validateForm.controls['week3'].reset();
            this.validateForm.controls['weekday3'].reset();
            this.validateForm.controls['classNum3'].reset();
            this.validateForm.controls['type3'].reset();
        }
        this.loadStatus = true;
        this.current-=1;
        this.loadStatus = false;
    }
    //8.控制周次全选单双重置，传入数据源和操作类型，操作类型0=>全选，1双数，2单数，其他重置
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
    //9.获得表单控制
    getFormControl(name) {
        return this.validateForm.controls[name];
    }
    //10.全局初始化
    ngOnInit() {
        this.validateForm = this.fb.group({
            course: ["", [Validators.required]],
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
        });//绑定数据校验
        this.getType()//获取实验室类型;
        this.getCourse();//获取课程名
    }
    getRemark(n,id){
        if(this.courseStatus[n-1][id]==null){
        let weektemp = [], weekdaytemp = [], classNumtemp = [], coursetemp = [], typetemp=[];
        for (let j = 0; j < this.validateForm.controls['week' + n].value.length; j++) {
            weektemp.push(this.validateForm.controls['week' + n].value[j].value);
        }
        for (let j = 0; j < this.validateForm.controls['classNum' + n].value.length; j++) {
            classNumtemp.push(this.validateForm.controls['classNum' + n].value[j].value);
        }
        for (let j = 0; j < this.validateForm.controls['type' + n].value.length; j++) {
            typetemp.push(this.validateForm.controls['type' + n].value[j].value);
        }
        weekdaytemp[0] = this.validateForm.controls['weekday' + n].value.value;
        let data = {
            labId:id,
            week: weektemp,//周数
            weekday: weekdaytemp,//星期几
            classNum: classNumtemp,//第几节
        };
        this.orderService.executeHttp("lab/getLabOrderStatus",data).then((result: any) => {
            let res = JSON.parse(result['_body']);
            if(res["result"]=="success"){
                this.courseStatus[n-1][id] = res.status;
                console.log(id,res.status)
            }
        })
        }
    }
}
