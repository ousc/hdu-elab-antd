import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IndexModule} from './index/index.module';
import {HomeModule} from './home/home.module';
import {LoginModule} from './login/login.module';
import {routes} from './routes';
import {CalendarModule} from './calendar/calendar.module';
import {OrderModule} from './order/order.module';
import {OrderManageModule} from './orderManage/orderManage.module';
import {CoursesModule} from './courses/courses.module';
import {ProfileModule} from './profile/profile.module';
import {RegisterModule} from './register/register.module';
import {passwordEditModule} from './passwordEdit/passwordEdit.module';
import {ExperimentsModule} from './experiments/experiments.module';

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        IndexModule,
        HomeModule,
        LoginModule,
        CalendarModule,
        OrderModule,
        OrderManageModule,
        CoursesModule,
        ExperimentsModule,
        ProfileModule,
        RegisterModule,
        passwordEditModule,
    ]
})

export class RoutesModule {

}
