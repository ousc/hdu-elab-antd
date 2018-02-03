import {Injectable} from '@angular/core';
import {SessionStorageService} from '@core/storage/storage.module';

@Injectable()
export class RegisterService {
  constructor(private _storage: SessionStorageService) {
  }
  /*  user = {
        'userName': 'userName',
        'password': 'password',
        'nickName': 'nickName',
        'email': 'email',
        'phone': 'phone',
    };*/
  register(user: any) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (user.userName === 'admin') {
            resolve(true);
          } else {
            reject(false);
          }
        }, 2000);
    });
  }
  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((username === 'admin' && password === 'admin') || (username === 'guest' && password === 'guest')) {
          this._storage.set('username', username);
          resolve(true);
        } else {
          reject(false);
        }
      }, 2000);
    });
  }
}
