import {Injectable} from '@angular/core';
import {SessionStorageService} from '@core/storage/storage.module';
import {Http, Headers, RequestOptions} from '@angular/http';

@Injectable()
export class OrderService {
  constructor(private _storage: SessionStorageService,public http: Http) {
  }
  executeHttp( curl: any, data: any) {
      let headers = new Headers({'Content-Type': 'application/json'});
      let options = new RequestOptions({headers: headers});
      let content = JSON.stringify({username: this._storage.get('username'), data: data});
      return new Promise((resolve, reject) => {
          this.http.post(curl, content, options)
              .subscribe(result => {
                  resolve(result)
              })
      });
  }
}



