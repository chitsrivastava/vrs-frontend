import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Vehicle } from 'src/model/vehicle.model';
import { AuthService } from 'src/app/service/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { VehicleService } from 'src/app/service/vehicle.service';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {


  static vehicleDeleteId: number;
  static vehicleDeleteName: string;
  startDate: Date;
  numberOfDays: number;
  vehicleId: number;
  daletedSuccess: boolean = false;
  amount: number = 0;


  @Input()
  vehicle: Vehicle;
  @Output()
  booking = new EventEmitter();
  @Output()
  delete = new EventEmitter();

  constructor(private route: ActivatedRoute, private router: Router, private vehicleService: VehicleService, private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.vehicleId = params['vehicleId'];
    });
  }
  setDeleteVehicle(id: number, name: string) {
    VehicleInfoComponent.vehicleDeleteId = id;
    VehicleInfoComponent.vehicleDeleteName = name;
  }
  isAdmin() { 
    if (this.authService.loggedIn && this.authService.isAdmin) {
      return true;
    }
    return false;
  }
  bookVehicle(vehicleId: number) {
    if(!this.authService.loggedIn){
      this.authService.authSource='book';
      this.router.navigate(['/login'])
    }
    this.booking.emit({vehicle:this.vehicle})
  }
  removeVehicle() {
    this.vehicleService.remove(VehicleInfoComponent.vehicleDeleteId).subscribe((data) => {
      if (data) {
        this.delete.emit({refresh:true})
        this.ngOnInit();
      }
    });
  }


  openVehicleDetails(vehicleId: number) {
    this.router.navigate(['vehicle', vehicleId]);
  }

  get getVehicleDeleteName() {
    return VehicleInfoComponent.vehicleDeleteName;
  }

}
