import {Injectable} from '@angular/core';
import {SessionStorageService} from '@core/storage/storage.module';

@Injectable()
export class DcbgService {
  constructor(private _storage: SessionStorageService) {
  }

}