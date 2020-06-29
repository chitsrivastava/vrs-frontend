import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './site/header/header.component';
import { LoginComponent } from './site/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignupComponent } from './site/signup/signup.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
import { VehicleInfoComponent } from './vehicle/vehicle-info/vehicle-info.component';
//import { VehicleDetailsComponent } from './vehicle/vehicle-details/vehicle-details.component';
import { VehicleEditComponent } from './vehicle/vehicle-edit/vehicle-edit.component';
import { VehicleAddComponent } from './vehicle/vehicle-add/vehicle-add.component';
import { UserComponent } from './user/user.component';
import { ApproveUserComponent } from './approve-user/approve-user.component';
import { VehicleBookingComponent } from './vehicle/vehicle-booking/vehicle-booking.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { SearchComponent } from './vehicle/search/search.component';
import { DatePipe } from '@angular/common';
import { NotificationComponent } from './user/notification/notification.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    VehicleListComponent,
    VehicleInfoComponent,
    //VehicleDetailsComponent,
    VehicleEditComponent,
    VehicleAddComponent,
    UserComponent,
    ApproveUserComponent,
    VehicleBookingComponent,
    SuperAdminComponent,
    SearchComponent,
    NotificationComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
