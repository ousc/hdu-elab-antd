import {Injectable} from '@angular/core';
import {SessionStorageService} from '@core/storage/storage.module';

@Injectable()
export class SettingService {
  constructor(private _storage: SessionStorageService) {
  }

}
