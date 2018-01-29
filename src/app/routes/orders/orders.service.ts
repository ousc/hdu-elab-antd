import {Injectable} from '@angular/core';
import {SessionStorageService} from '@core/storage/storage.module';

@Injectable()
export class OrdersService {
  constructor(private _storage: SessionStorageService) {
  }

}
