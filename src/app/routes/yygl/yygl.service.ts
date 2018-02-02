import {Injectable} from '@angular/core';
import {SessionStorageService} from '@core/storage/storage.module';
import {NHttpClinet} from '@core/utils/http.client';
import {BaseService} from '@core/utils/BaseRequest';
import {reject} from 'q';

@Injectable()
export class YyglService extends BaseService {
  constructor(private _storage: SessionStorageService, http: NHttpClinet) {
    super('yygl', http);
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
