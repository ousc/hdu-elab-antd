import {SessionStorageService} from '@core/storage/storage.module';
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
const host = "http://aliyun.charlesxu.cn:8080/LabManager/";

@Injectable()
export class LoginService {
  constructor(private _storage: SessionStorageService,public http: Http) {
  }
  executeHttp( curl: any, data: any) {
      let headers = new Headers({'Content-Type': 'application/json','charset':'utf-8'});
      let options = new RequestOptions({headers: headers});
      let content = JSON.stringify(data);
      return new Promise((resolve, reject) => {
          this.http.post(host+curl, content, options)
                .subscribe(result => {
                    resolve(result)
                })
      });
  }
  login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.executeHttp("/user/login",{"userName":username,"password":password}).then((result: any) => {
            let res = JSON.parse(result['_body']).result;
            if(res==1){
                this._storage.set('username', username);
                resolve(true);
            }else{
                reject(false);
            }
        })
        // if ((username === 'admin' && password === 'admin') || (username === 'guest' && password === 'guest') || (username === '40392' && password === '123456')) {
        //   this._storage.set('username', username);
        //   resolve(true);
        // } else {
        //   reject(false);
        // }
      }, 1000);
    });
  }
}
