import {Injectable} from '@angular/core';
import {SessionStorageService} from 'app/core/storage/storage.module';
import {Headers, Http, RequestOptions} from '@angular/http';


@Injectable()
export class AddCourseService {
    constructor(private _storage: SessionStorageService, private http:Http) {
    }
    executeHttp( curl: any, data: any) {
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        let content = JSON.stringify(data);
        return new Promise((resolve, reject) => {
            this.http.post(curl, content, options)
                .subscribe(result => {
                    resolve(result);
                });
        });
    }
}
