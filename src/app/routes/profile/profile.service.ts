import {Injectable} from '@angular/core';
import {SessionStorageService} from 'app/core/storage/storage.module';


@Injectable()
export class ProfileService {
  constructor(private _storage: SessionStorageService) {
  }

}
