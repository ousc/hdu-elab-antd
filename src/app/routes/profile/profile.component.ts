///<reference path="../../../../node_modules/@angular/forms/src/model.d.ts"/>
///<reference path="../../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import {Component, OnInit} from '@angular/core';
import {ProfileService} from './profile.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';


@Component({
  selector: 'profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['./profile.component.less'],
  providers: [ProfileService]
})
export class ProfileComponent implements OnInit {
    constructor( private ProfileService: ProfileService, private _message: NzMessageService) {
    }
    ngOnInit() {
    }
}
