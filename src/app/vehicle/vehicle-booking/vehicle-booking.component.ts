import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/service/vehicle.service';
import { Booking } from 'src/model/booking.model';
import { User } from 'src/model/user.model';
import { ActivatedRoute, Params } from '@angular/router';
import { VehicleBooking } from 'src/model/vehicle-booking.model';

@Component({
  selector: 'app-vehicle-booking',
  templateUrl: './vehicle-booking.component.html',
  styleUrls: ['./vehicle-booking.component.css']
})
export class VehicleBookingComponent implements OnInit {

  constructor(private route:ActivatedRoute, private vehicleService: VehicleService) { }
  vehicleName:string;
  bookingList:VehicleBooking[];
  vehicleId:number;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.vehicleId = params['vehicleId'];
    });
    console.log(this.vehicleId)
    this.vehicleService.getVehicleBookings(this.vehicleId).subscribe(data => {
      this.bookingList = data;
      this.vehicleName = this.bookingList[0].booking.vehicle.name;
    })
  }
}
