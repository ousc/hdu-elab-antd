///<reference path="../../../../node_modules/@angular/forms/src/model.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {OrderService} from './order.service';
import {Router} from '@angular/router';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {SessionStorageService} from "@core/storage/storage.service";

@Component({
  selector: 'app-order',
  templateUrl: 'order.component.html',
  styleUrls: ['./order.component.less'],
  providers: [OrderService]
})

export class OrderComponent implements OnInit {
  constructor(private confirmServ: NzModalService,private fb: FormBuilder, private orderService: OrderService, private router: Router, private _message: NzMessageService,public _storage: SessionStorageService) {
  }
  validateForm: FormGroup;
  loadStatus: boolean;
  labdata = [{"checked":false,aqCount:'0',status:'false',"id":2,"adminId":2,"adminName":"张三","labName":"软件开发综合实验室","labType":"软件实验室","labPeoCount":100,"labBuild":1,"labNumber":105,"labIntroduce":"a"},
    {"checked":false,aqCount:'0',status:'false',"id":3,"adminId":3,"adminName":"李四","labName":"安卓开发实验室","labType":"软件实验室","labPeoCount":100,"labBuild":3,"labNumber":317,"labIntroduce":"a"},
    {"checked":false,aqCount:'0',status:'true',"id":4,"adminId":4,"adminName":"王五","labName":"苹果开发实验室","labType":"软件实验室","labPeoCount":100,"labBuild":3,"labNumber":318,"labIntroduce":null}];
  //使用时将本数组置空
  submitBtn = '下一步';
  submitBackBtn = '上一步';
  current = 0;
  zhiyuan2  = false;
  zhiyuan3  = false;
  course = [
    { value: '101123123', label: '数据结构课程设计{周一345节 1-17周}' },
    { value: '101123124', label: '数据结构课程设计{周一456节 1-17周}' },
    { value: '101123125', label: '数据结构课程设计{周一678节 1-17周}' }
  ];
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
    { value:16, label: '16' }
    ];
  weekday = [{ value:1, label: '星期一' },
    { value:2, label: '星期二' },
    { value:3, label: '星期三' },
    { value:4, label: '星期四' },
    { value:5, label: '星期五' },
    { value:6, label: '星期六' },
    { value:7, label: '星期日' }
  ];
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
  ];
  type = [
    { value:1, label: '计算机房1' },
    { value:2, label: '计算机房2' },
  ];
  info(contentTpl) {
    this.confirmServ.info({
      title: '警告',
      content: contentTpl
    });
  }
  submit(n): void {
    let url = ['接口地址1', '接口地址2', '接口地址3', '接口地址4'];//改为接口地址
    switch (n) {
      case 0: {
        for (let i = 1; i < 4; i++) {
          if (i == 2 && this.zhiyuan2 == false) continue;
          if (i == 3 && this.zhiyuan3 == false) continue;
          let weektemp = [], weekdaytemp = [], classNumtemp = [], coursetemp = [];
          for (let j = 0; j < this.validateForm.controls['week' + i].value.length; j++) {
            weektemp.push(this.validateForm.controls['week' + i].value[j].value);
          }
          for (let j = 0; j < this.validateForm.controls['classNum' + i].value.length; j++) {
            classNumtemp.push(this.validateForm.controls['classNum' + i].value[j].value);
          }
          weekdaytemp[0] = this.validateForm.controls['weekday' + i].value.value;
          coursetemp[0] = this.validateForm.controls['course'].value.value;
          let data = {
            course: coursetemp,//课程
            week: weektemp,//周数
            weekday: weekdaytemp,//星期几
            classNum: classNumtemp,//第几节
            type: this.validateForm.controls['type' + i].value.value//种类
          };
          // let res = this.orderService.executeHttp(url[n],{username:this._storage.get('username'),data:data,no:i});
          // if(res['result']=='success'){
          //   alert('志愿'+i+'提交失败');
          //   return;
          // }
          // else{
          //   for(let i=0;i<res['lab'].length;i++){
          //    res['lab']['checked']=false;
          //    res['lab']['aqCount']=0;
          //    this.labdata.push(res['lab'][i]);
          //   }
          // }
          console.log('已将');
          console.log(this._storage.get('username'));
          console.log(data);
          console.log(i);
          console.log('提交到' + url[0]);
        }
        this.current += 1;
        this.submitBtn = '下一步';
        break;
      }
      case 1: {
        let data = [];
        for (let i = 0; i < this.labdata.length; i++)
          if (this.labdata[i].checked) {
            data.push(this.labdata[i].id);
          }
        if (data.length == 0) {
          this.info('请至少选择一个实验室！');
          this.submitBtn = '下一步';
          break;
        }
        console.log(data);
        // let res = this.orderService.executeHttp(url[1],{username:this._storage.get('username'),data:data});
        this.current += 1;
        this.submitBtn = '下一步';
        break;
      }
      case 2:{
        let data = [];
        for (let i = 0; i < this.labdata.length; i++)
          if (this.labdata[i].checked) {
            data.push(this.labdata[i].id);
            data.push(this.labdata[i].aqCount);
          }
          console.log(data);
        // let res = this.orderService.executeHttp(url[1],{username:this._storage.get('username'),data:data});
        // if(res.result==''success) this.current += 1;
        this.current += 1;
        this.submitBtn = '下一步';
        break;
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
    console.log(this.validateForm.valid);
    if (this.validateForm.valid) {
      this.loadStatus = true;
      this.submitBtn = '提交中...';
      this.submit(this.current);
      this.loadStatus = false;
    }
  }
  back(){
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
  //控制全选单双重置
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
