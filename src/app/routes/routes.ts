import {ModuleWithProviders} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {IndexComponent} from './index/index.component';
import {UserComponent} from './user/user.component';
import {CanAuthProvide} from '@core/services/auth.service';
import {ChartsComponent} from './charts/charts.component';
import {CalendarComponent} from './calendar/calendar.component';
import {OrderComponent} from './order/order.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent, canLoad: [CanAuthProvide]},
  {
    path: '', component: HomeComponent, canActivate: [CanAuthProvide],
    children: [
      {
        path: 'index', component: IndexComponent, canActivate: [CanAuthProvide],
        data: {
          breadcrumb: '首页'
        }
      },
      {
        path: 'user', component: UserComponent, canActivate: [CanAuthProvide],
        data: {
          breadcrumb: '用户'
        }
      },
      {
        path: 'calendar', component: CalendarComponent, canActivate: [CanAuthProvide],
        data: {
          breadcrumb: '本周上机课程'
        }
      },
      {
        path: 'order', component: OrderComponent, canActivate: [CanAuthProvide],
        data: {
          breadcrumb: '实验室预约'
        }
      },
      {path: 'charts', component: ChartsComponent, canActivate: [CanAuthProvide]},
      {path: '', redirectTo: 'index', pathMatch: 'full'}
    ]
  },
  {path: '**', redirectTo: 'index', pathMatch: 'full'}
];

