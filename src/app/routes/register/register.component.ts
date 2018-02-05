import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import {RegisterService} from './register.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-RegisterService',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.less'],
  providers: [RegisterService]
})

export class RegisterComponent implements OnInit {
  validateForm: FormGroup;
  loadStatus: boolean;
  registerBtn = '注册';
  loginBtn = '已有账号？去登录';
  constructor(private fb: FormBuilder, private RegisterService: RegisterService,
              private router: Router, private _message: NzMessageService) {
    }
    _submitForm() {
        for (const i in this.validateForm.controls) {
            this.validateForm.controls[ i ].markAsDirty();
        }
        if (this.validateForm.valid) {
            this.loadStatus = true;
            this.registerBtn = '正在注册……';
            const userName = this.validateForm.value.userName;
            const password = this.validateForm.value.password;
            const nickName = this.validateForm.value.nickName;
            const email = this.validateForm.value.email;
            const phone = this.validateForm.value.phoneNumber;
            const user = {
              'userName': userName,
              'password': password,
              'nickName': nickName,
              'email': email,
              'phone': phone,
            };
            this.RegisterService.register(user)
                .then(result => {
                    this.router.navigate(['login']);
                }, (err) => {
                    this.loadStatus = false;
                    this.registerBtn = '注册';
                    this._message.error('注册失败！');
                });
        }
    }


    updateConfirmValidator() {
        /** wait for refresh value */
        setTimeout(_ => {
            this.validateForm.controls[ 'checkPassword' ].updateValueAndValidity();
        });
    }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.validateForm.controls[ 'password' ].value) {
            return { confirm: true, error: true };
        }
    }

    confirmUserName() {
      const userName = this.validateForm.value.userName;
      if (userName == null || userName === '') {return false};
      const name = parseInt(userName, 0);
      if (isNaN(name)) {
          return true;
      } else {
          return false;
      }
    }
    confirmPhoneNumber() {
        const phone = this.validateForm.value.phoneNumber;
        if (phone == null || phone === '') {return false};
        const name = parseInt(phone, 0);
        if (isNaN(name)) {
            return true;
        } else {
            return false;
        }
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            userName        : [ null, [ Validators.required]],
            email            : [ null, [ Validators.email ] ],
            password         : [ null, [ Validators.required ] ],
            checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
            nickName         : [ null, [ Validators.required ] ],
            phoneNumber      : [ null, [ Validators.required ] ],
        });
    }

    getFormControl(name) {
        return this.validateForm.controls[ name ];
    }
}
