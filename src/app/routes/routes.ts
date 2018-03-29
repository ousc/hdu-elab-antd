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
import {AddCourseComponent} from './courses/addCourse/addCourse.component';
import {EditCourseComponent} from './courses/editCourse/editCourse.component';
import {ExperimentsComponent} from './experiments/experiments.component';
import {SettingComponent} from './experiments/setting/setting.component';
import {ExportFormComponent} from './experiments/exportForm/exportForm.component';
import {ProfileComponent} from './profile/profile.component';
import {RegisterComponent} from './register/register.component';
import {passwordEditComponent} from './passwordEdit/passwordEdit.component';
import {HistoricalOrdersComponent} from './orderManage/historicalOrders/historicalOrders.component';
import {HistoricalCoursesComponent} from './courses/historicalcourses/historicalCourses.component';

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
                path: 'courses/history', component: HistoricalCoursesComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '历史课程'
                }
            },
            {
                path: 'courses/add', component: AddCourseComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '添加课程'
                }
            },
            {
                path: 'courses/edit', component: EditCourseComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '编辑课程'
                }
            },
            {
                path: 'experiments', component: ExperimentsComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '实验管理'
                }
            },
            {
                path: 'experiments/setting', component: SettingComponent, canActivate: [CanAuthProvide],
                data: {
                    breadcrumb: '实验设置'
                }
            },
            {
                path: 'experiments/exportForm', component: ExportFormComponent, canActivate: [CanAuthProvide],
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

