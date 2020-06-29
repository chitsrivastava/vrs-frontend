import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { VehicleService } from 'src/app/service/vehicle.service';
import { Vehicle } from 'src/model/vehicle.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { Coupon } from 'src/model/coupon.model';
import { DatePipe } from '@angular/common';
import { error } from 'util';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  popup:boolean=false;
  bookingStatus: string;
  reason: string;
  confirmButton: string = "Confirm Booking"
  vehicle:Vehicle;

  vehicleName:string;
  vehicles: Vehicle[];
  originalVehicleList:Vehicle[];
  vehicleId: number;
  bookForm: FormGroup;
  amount: number;
  viewAmount:number;
  coupons:Coupon[];
  startDate: Date;
  coupon:Coupon;
  numberOfDays: number;
  today:string; //for disabling previous dates

  vehicleDeleteId: number;
  vehicleDeleteName: string;
  bookStartDate: Date;
  bookNumberOfDays: number;
  bookVehicleId: number;
  daletedSuccess: boolean = false;
  bookAmount: number = 0;

  constructor(private router:Router, private vehicleService: VehicleService, private authService: AuthService,private datapipe:DatePipe) { }

  ngOnInit() {
    this.today=this.datapipe.transform(new Date(),'yyyy-MM-dd') //for disabling previous dates
    this.bookForm = new FormGroup({
      'startDate': new FormControl(null, Validators.required),
      'numberOfDays': new FormControl(1, [Validators.required, Validators.min(1), Validators.max(31)]),
    })

    if(this.authService.isAdmin){
      this.vehicleService.vehiclesAdmin().subscribe(data => {
        this.vehicles = [...data]
        this.originalVehicleList=[...data]
      })
    }else{
      this.vehicleService.vehicles().subscribe((data)=>{
        this.vehicles = [...data]
        this.originalVehicleList=[...data]
      },(error)=>{
      })
    }
    this.vehicleService.filter.subscribe((obj: { name: string }) => {
      if (obj.name !== '') {
        const result = this.originalVehicleList.filter(vehicle => vehicle.name.toLowerCase().includes(obj.name.toLowerCase()));
        this.vehicles = result ? result : [];
      }
      else {
        this.vehicles = [...this.originalVehicleList]
      }
    })

    this.bookForm.valueChanges.subscribe(data => {
      this.coupon=null;
      this.numberOfDays = data['numberOfDays'];
      console.log(data);
      this.amount = this.numberOfDays * this.vehicle.price
    });

    this.vehicleService.getCoupon().subscribe(data=>{
      this.coupons=[...data];
    })
  }

  confirmBooking() {
    if(this.confirmButton ==='View Bookings'){
      document.getElementById('close-modal').click();
      this.router.navigate(['/user']);
    }
    this.confirmButton = 'Booking'
    this.bookingStatus=null;
    if(this.coupon == null){
      this.coupon={couponId:0,code:'',value:0}
    }
    this.vehicleService.bookVehicle(this.authService.emailAuthenticated, this.vehicle.vehicleId, this.bookForm.value.startDate, this.bookForm.value.numberOfDays,this.coupon.couponId).subscribe(data => {
      setTimeout(() => {
        console.log("\n\nBooking Data",data,"\n\n")
          this.confirmButton = 'View Bookings',
          this.bookingStatus = data['status'],
          this.reason = data['reason']
        }, 1500)
      })
    
  }

  bookVehicle(vehicle: Vehicle) {
    this.amount=0;
    this.coupon=null;
    this.confirmButton = "Confirm Booking"
    this.bookingStatus=null;
    this.vehicle = vehicle;
    if(!this.authService.loggedIn){
      this.authService.authSource='book';
      this.router.navigate(['/login'])
    }
  }

  
  getBookedVehicle(){
    return this.vehicle;
  }

  isAdmin(){
    return this.authService.isAdmin;
  }
  
  applyCoupon(coupon:Coupon){
    this.coupon=coupon;
    this.amount = (this.numberOfDays==null?1:this.numberOfDays)*this.vehicle.price;
    this.amount=this.amount-(this.amount*coupon.value)/100;
  }

  setDeleteVehicle(id: number, name: string) {
    this.vehicleDeleteId = id;
    this.vehicleDeleteName = name;
  }

  get getVehicleDeleteName() {
    return this.vehicleDeleteName;
  }

  removeVehicle() {
    this.vehicleService.remove(this.vehicleDeleteId).subscribe((data) => {
      if (data) {
        this.ngOnInit();
      }
    });
  }
}
