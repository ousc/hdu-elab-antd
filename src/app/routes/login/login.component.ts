import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import {LoginService} from './login.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [LoginService]
})

export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  loadStatus: boolean;
  loginBtn = '登录';
    registerBtn = '没有账号？去注册';

  _submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
    }
    if (this.validateForm.valid) {
      this.loadStatus = true;
      this.loginBtn = '正在登录……';
      const userName = this.validateForm.value.userName;
      const password = this.validateForm.value.password;
      this.loginService.login(userName, password)
        .then(result => {
          this.router.navigate(['']);
        }, (err) => {
          this.loadStatus = false;
          this.loginBtn = '登录';
          this._message.error('用户名或密码错误！');
        });
    }
  }

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private _message: NzMessageService) {
  }

  getFormControl(name) {
    return this.validateForm.controls[name];
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
}
