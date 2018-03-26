///<reference path="../../../../../node_modules/@angular/forms/src/model.d.ts"/>
///<reference path="../../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {ExportFormService} from './exportForm.service';

@Component({
  selector: 'exportForm',
  templateUrl: 'exportForm.component.html',
  styleUrls: ['./exportForm.component.less'],
  providers: [ExportFormService]
})

export class ExportFormComponent implements OnInit {
    validateForm: FormGroup;
    course = [
        { value: '101123123', label: '数据结构课程设计{周一345节 1-17周}', },
        { value: '101123124', label: '数据结构课程设计{周一345节 1-17周}', },
        { value: '101123125', label: '数据结构课程设计{周一345节 1-17周}', },
    ];
    type = [
        { value: '1', label: '计算机房1' },
        { value: '2', label: '计算机房2' },
    ];
    current = 0;
    page1 = true;
    page2 = false;
    error = false;
    pre() {
        this.current -= 1;
        this.changeContent();
    }

    next() {
        this.current += 1;
        this.changeContent();
    }

    done() {
        this._message.success('完成');
    }

    changeContent() {
        switch (this.current) {
            case 0: {
                this.page1 = true;
                this.page2 = false;
                this.error = false;
                break;
            }
            case 1: {
                this.page1 = false;
                this.page2 = true;
                this.error = false;
                break;
            }
            default: {
                this.page1 = false;
                this.page2 = false;
                this.error = true;
            }
        }
    }
    constructor(private _message: NzMessageService, private fb: FormBuilder) {
    }
    ngOnInit() {
        this.validateForm = this.fb.group({
            select         : [ 'China' ],
        });
    }

}

