import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { User } from 'src/model/user.model';
import { AuthService } from '../service/auth.service';
import { VehicleService } from '../service/vehicle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Coupon } from 'src/model/coupon.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  bookingId: number;
  coupons:Coupon[];
  couponForm:FormGroup;
  constructor(private userService: UserService, private authService: AuthService, private vehicleService: VehicleService) { }
  couponCodeTaken:boolean=false;
  couponCodeEmpty:boolean=true;
  user: User;
  ngOnInit() {
    this.vehicleService.getCoupon().subscribe(data=>{
      this.coupons=[...data];
    })
    this.couponForm = new FormGroup({
      'couponCode': new FormControl(null,Validators.required),
      'couponValue': new FormControl(10, [Validators.required, Validators.min(1), Validators.max(50)]),
    })
    this.userService.getUser(this.authService.emailAuthenticated).subscribe((data: User) => {
      this.user = data;
      console.log(this.user)
      Array.from(this.user.bookingList);
      this.user.bookingList = this.user.bookingList.sort((obj1, obj2) => {
        if (obj1.bookingId < obj2.bookingId)
          return 1;

        else if (obj1.bookingId > obj2.bookingId)
          return -1;

        return 0;
      });
      Array.from(this.user.transactionList);
      this.user.transactionList = this.user.transactionList.sort((obj1, obj2) => {
        if (obj1.transactionId < obj2.transactionId)
          return 1;

        else if (obj1.transactionId > obj2.transactionId)
          return -1;

        return 0;
      });
  });
  }

  name(bookingId: number) {
    this.bookingId = bookingId;
  }

  manageCoupon(){
    document.getElementById("admin-action-buttons").hidden=true;
    document.getElementById("manage-coupon").hidden=false;
  }

  closeManageCooupons(){
    document.getElementById("manage-coupon").hidden=true;
    document.getElementById("admin-action-buttons").hidden=false;

  }

  endRide(bookingId: number) {
    this.vehicleService.endRide(bookingId).subscribe(data => {
      this.ngOnInit();
    });
  }

  cancelBooking(bookingId: number) {
    this.vehicleService.cancelBooking(bookingId).subscribe(data => {
      this.ngOnInit();
    });
  }

  isAdmin() {
    return this.authService.isAdmin;
  }
  addCoupon(){
    let coupon:Coupon={code:this.couponForm.value.couponCode, value:this.couponForm.value.couponValue}
    this.couponForm.value.couponValue;
    this.vehicleService.addCoupon(coupon).subscribe(data=>{
      if(data){
        this.ngOnInit();
      }
    });
  }

  couponTaken(){
    let couponCode = this.couponForm.get('couponCode').value
  if(couponCode.length==0){
    return;
  }
  this.vehicleService.couponTaken(couponCode).subscribe((data=>{
    console.log("Coupon Available",data)
    if(couponCode.length == 0){
      this.couponCodeEmpty = true;
    }
    else{
      this.couponCodeEmpty = false;
    }
    this.couponCodeTaken= data;  

  }))
  }
  
  removeCoupon(id:number){
    console.log(id);
    this.vehicleService.removeCoupon(id).subscribe(data=>{
      if(data){
        console.log(data);
        this.ngOnInit();
       //let coupon:Coupon = this.coupons.find(c=>c.couponId===id)
      }
    })
  }

}
