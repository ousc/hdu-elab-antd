import {enableProdMode, ViewEncapsulation} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
// console.log("%c%s","color: red; background: yellow; font-size: 40px;","欢迎访问杭州电子科技大学实验室预约系统！");
// console.log("%c%s", "color:red;font-weight:bold;","OUSC");
