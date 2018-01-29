import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {IndexModule} from './index/index.module';
import {HomeModule} from './home/home.module';
import {UserModule} from './user/user.module';
import {LoginModule} from './login/login.module';
import {routes} from './routes';
import {ChartsModule} from './charts/charts.module';
import {CalendarModule} from './calendar/calendar.module';
import {OrderModule} from './order/order.module';
import {OrdersModule} from './orders/orders.module';
import {CoursesModule} from './courses/courses.module';


@NgModule({
    imports: [
        RouterModule.forRoot(routes, {useHash: true}),
    ],
    exports: [
        IndexModule,
        HomeModule,
        UserModule,
        LoginModule,
        ChartsModule,
        CalendarModule,
        OrderModule,
        OrdersModule,
        CoursesModule,
    ]
})

export class RoutesModule {

}
