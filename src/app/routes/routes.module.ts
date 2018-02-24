import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IndexModule} from './index/index.module';
import {HomeModule} from './home/home.module';
import {LoginModule} from './login/login.module';
import {routes} from './routes';
import {CalendarModule} from './calendar/calendar.module';
import {OrderModule} from './order/order.module';
import {YyglModule} from './yygl/yygl.module';
import {CoursesModule} from './courses/courses.module';
import {SyglModule} from './sygl/sygl.module';
import {ProfileModule} from './profile/profile.module';
import {RegisterModule} from './register/register.module';
import {passwordEditModule} from './passwordEdit/passwordEdit.module';


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
        YyglModule,
        CoursesModule,
        SyglModule,
        ProfileModule,
        RegisterModule,
        passwordEditModule,
    ]
})

export class RoutesModule {

}
