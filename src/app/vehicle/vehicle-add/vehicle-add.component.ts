import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/service/vehicle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vehicle } from 'src/model/vehicle.model';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {

  today:string;
  vehicleAdded:boolean=false;
  vehicleId:number;
  addVehicleForm: FormGroup;
  vehicle: Vehicle;
  userNameTaken: boolean = false;
  userNameEmpty: boolean = true;
  constructor(private vehicleService: VehicleService, private router:Router, private datepipe:DatePipe) { }

  ngOnInit() {
    this.today = this.datepipe.transform(new Date(),'yyyy-MM-dd')
    this.addVehicleForm = new FormGroup({
      'name': new FormControl(null, [Validators.required,Validators.pattern('^[ A-Za-z0-9+-]+$')]),
      'imageUrl': new FormControl(null, Validators.required),
      'type': new FormControl(null, Validators.required),
      'insuranceExpiryDate': new FormControl(null, Validators.required),
      'lastServiceDate': new FormControl(null, Validators.required),
      'serviceDueDate': new FormControl(null, Validators.required),
      'price': new FormControl(null, [Validators.required,Validators.min(1)]),
      'availability': new FormControl(),
      'number':new FormControl(null,Validators.required)
    });

    setTimeout(()=>console.log(this.addVehicleForm),15000)
  }

  onSubmit() {
    this.vehicle = {
      number:this.addVehicleForm.value.number,
      vehicleId: this.vehicleId,
      name: this.addVehicleForm.value.name,
      insuranceExpiryDate: this.addVehicleForm.value.insuranceExpiryDate,
      lastServiceDate: this.addVehicleForm.value.lastServiceDate,
      serviceDueDate: this.addVehicleForm.value.serviceDueDate,
      price: this.addVehicleForm.value.price,
      type: this.addVehicleForm.value.type,
      availability: true,
      imageUrl: this.addVehicleForm.value.imageUrl
    }
    
      this.vehicleService.add(this.vehicle).subscribe((data:boolean)=>{
        if(data){
          this.vehicleAdded=true;
          setTimeout(() => {
            this.vehicleAdded = false;
            this.router.navigate(['/vehicles']);
          }, 1000);
        }
        else{
          this.vehicleAdded=false;
        }
      })
  }

  userTaken() {
    let email = this.addVehicleForm.get('number').value;
    if (email.length == 0) {
      return;
    }
    
    this.vehicleService.isAvailable(email).subscribe((data:boolean)=>{

      if (email.length == 0) {
        this.userNameEmpty = true;
      }
      else {
        this.userNameEmpty = false;
      }
      this.userNameTaken = data;

    });
  }

}
