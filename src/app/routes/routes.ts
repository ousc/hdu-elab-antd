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
import {OrdersComponent} from './orders/orders.component';
import {DetailComponent} from './orders/detail/detail.component';
import {CoursesComponent} from './courses/courses.component';
import {AddcourseComponent} from './courses/addcourse/addcourse.component';
import {EditcourseComponent} from './courses/editcourse/editcourse.component';

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
            {
                path: 'orders', component: OrdersComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '预约管理'
                },
            },
            { path : 'orders/detail', component: DetailComponent, canActivate: [CanAuthProvide],
                data : {
                    breadcrumb: '预约详情'
                }
            },
            {
                path: 'courses', component: CoursesComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '课程管理'
                }
            },
            {
                path: 'courses/add', component: AddcourseComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '添加课程'
                }
            },
            {
                path: 'courses/edit', component: EditcourseComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '编辑课程'
                }
            },
            {path: 'charts', component: ChartsComponent, canActivate: [CanAuthProvide]},
            {path: '', redirectTo: 'index', pathMatch: 'full'}
        ]
    },
    {path: '**', redirectTo: 'index', pathMatch: 'full'}
];

