import {ModuleWithProviders} from '@angular/core';

import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {IndexComponent} from './index/index.component';
import {CanAuthProvide} from '@core/services/auth.service';
import {CalendarComponent} from './calendar/calendar.component';
import {OrderComponent} from './order/order.component';
import {OrderManageComponent} from './orderManage/orderManage.component';
import {CoursesComponent} from './courses/courses.component';
import {AddcourseComponent} from './courses/addCourse/addcourse.component';
import {EditcourseComponent} from './courses/editCourse/editcourse.component';
import {SyglComponent} from './experiments/sygl.component';
import {SyszComponent} from './experiments/sysz/sysz.component';
import {DcbgComponent} from './experiments/dcbg/dcbg.component';
import {ProfileComponent} from './profile/profile.component';
import {RegisterComponent} from './register/register.component';
import {passwordEditComponent} from "./passwordEdit/passwordEdit.component";
import {HistoricalOrdersComponent} from './orderManage/historicalOrders/historicalOrders.component';

export const routes: Routes = [
    {path: 'register', component: RegisterComponent},
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
                path: 'orders', component: OrderManageComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '预约管理'
                }
            },
            {
                path: 'orders/history', component: HistoricalOrdersComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '历史预约'
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
            {
                path: 'sygl', component: SyglComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '实验管理'
                }
            },
            {
                path: 'sygl/sysz', component: SyszComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '实验设置'
                }
            },
            {
                path: 'sygl/dcbg', component: DcbgComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '导出表格'
                }
            }, {
                path: 'profile', component: ProfileComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '个人资料'
                }
            }, {
                path: 'passwordEdit', component: passwordEditComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '密码修改'
                }
            },
            {path: '', redirectTo: 'index', pathMatch: 'full'}
        ]
    },
    {path: 'admin', component: LoginComponent, canLoad: [CanAuthProvide]},
    {path: '**', redirectTo: 'index', pathMatch: 'full'}
];

