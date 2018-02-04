import {Injectable} from '@angular/core';
import {SessionStorageService} from '@core/storage/storage.module';
import {NHttpClinet} from '@core/utils/http.client';
import {BaseService} from '@core/utils/BaseRequest';
import {reject} from 'q';
import {Headers, Http, RequestOptions} from '@angular/http';

@Injectable()
export class YyglService extends BaseService {
  constructor(private _storage: SessionStorageService, http: Http, https: NHttpClinet) {
    super('yygl', https);
  }
    executeHttp( curl: any, data: any) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let content = JSON.stringify({username: this._storage.get('username'), data: data});
        return new Promise((resolve, reject) => {
            this.http.post(curl, content, options)
                .subscribe(result => {
                    resolve(result);
                });
        });
    }
  getOrder() {
    const yyqk = 'https://www.easy-mock.com/mock/5a73c90cb4ec7020fa2f63e8/example/yyqk';
      return new Promise((resolve, reject) => {
          this.http.get(yyqk)
              .subscribe(result => {
                  resolve(result);
              });
      });
  }

    getOrderList() {
        return new Promise((resolve, reject) => {
            this.http.get('https://www.easy-mock.com/mock/5a73c90cb4ec7020fa2f63e8/yygl')
                .subscribe(result => {
                    resolve(result);
                });
        });
    }
}
