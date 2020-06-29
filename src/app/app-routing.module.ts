import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './site/login/login.component';
import { SignupComponent } from './site/signup/signup.component';
import { VehicleListComponent } from './vehicle/vehicle-list/vehicle-list.component';
//import { VehicleDetailsComponent } from './vehicle/vehicle-details/vehicle-details.component';
import { VehicleEditComponent } from './vehicle/vehicle-edit/vehicle-edit.component';
import { VehicleAddComponent } from './vehicle/vehicle-add/vehicle-add.component';
import { UserComponent } from './user/user.component';
import { ApproveUserComponent } from './approve-user/approve-user.component';
import { VehicleBookingComponent } from './vehicle/vehicle-booking/vehicle-booking.component';
import { SuperAdminComponent } from './super-admin/super-admin.component';
import { AuthGuardService } from './service/auth-guard.service';
import { NotificationComponent } from './user/notification/notification.component';
import {ErrorComponent} from "./error/error.component";

const routes: Routes = [
  { path: '', component: VehicleListComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuardService] },
  { path: 'approve', component: ApproveUserComponent, canActivate: [AuthGuardService] },
  { path: 'super-admin', component: SuperAdminComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'vehicles', component: VehicleListComponent },
  { path: 'notifications', component: NotificationComponent },
  { path: 'bookings/:vehicleId', component: VehicleBookingComponent, canActivate: [AuthGuardService] },
  { path: 'vehicle-add', component: VehicleAddComponent, canActivate: [AuthGuardService] },
  //{ path: 'vehicle/:vehicleId', component: VehicleDetailsComponent, canActivate: [AuthGuardService] },
  { path: 'edit/:vehicleId', component: VehicleEditComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
