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
import {YyglComponent} from './yygl/yygl.component';
import {DetailComponent} from './yygl/detail/detail.component';
import {CoursesComponent} from './courses/courses.component';
import {AddcourseComponent} from './courses/addcourse/addcourse.component';
import {EditcourseComponent} from './courses/editcourse/editcourse.component';
import {SyglComponent} from './sygl/sygl.component';
import {SyszComponent} from './sygl/sysz/sysz.component';
import {DcbgComponent} from './sygl/dcbg/dcbg.component';
import {ProfileComponent} from './profile/profile.component';
import {RegisterComponent} from './register/register.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent, canLoad: [CanAuthProvide]},
    {path: 'register', component: RegisterComponent},
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
                path: 'orders', component: YyglComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '预约管理'
                }
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
            },
            {path: 'charts', component: ChartsComponent, canActivate: [CanAuthProvide]},
            {path: '', redirectTo: 'index', pathMatch: 'full'}
        ]
    },
    {path: '**', redirectTo: 'index', pathMatch: 'full'}
];

