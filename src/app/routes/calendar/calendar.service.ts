import {Injectable} from '@angular/core';
import {SessionStorageService} from '@core/storage/storage.module';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class CalendarService {
    constructor(private _storage: SessionStorageService,public http: Http) {
    }
    getCalendar( curl: any) {
        let headers = new Headers({'Content-Type': 'application/json','charset':'utf-8'});
        let options = new RequestOptions({headers: headers});
        let content = JSON.stringify({userName: '40392'});
        return new Promise((resolve, reject) => {
            this.http.post(curl, content, options)
                .subscribe(result => {
                    resolve(result)
                })
        });
    }
}
