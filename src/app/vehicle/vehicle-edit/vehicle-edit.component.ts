import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { VehicleService } from 'src/app/service/vehicle.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Vehicle } from 'src/model/vehicle.model';
import { AuthService } from 'src/app/service/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-vehicle-edit',
  templateUrl: './vehicle-edit.component.html',
  styleUrls: ['./vehicle-edit.component.css']
})
export class VehicleEditComponent implements OnInit {

  constructor(private authService: AuthService, private route: ActivatedRoute, private vehicleService: VehicleService, private router: Router,private datepipe:DatePipe) { }

  editForm: FormGroup;
  vehicleEdited: boolean = false;
  vehicle: Vehicle;
  vehicleNumber:number;
  vehicleId: number;
  today:string;
  userNameTaken: boolean = true;
  userNameEmpty: boolean = true;
  ngOnInit() {
    this.today=this.datepipe.transform(new Date(),'yyyy-MM-dd')
    this.editForm = new FormGroup({
      'name': new FormControl(null, [Validators.required,Validators.pattern('^[ A-Za-z0-9+-]+$')]),
      'imageUrl': new FormControl(null, Validators.required),
      'type': new FormControl("petrol", Validators.required),
      'insuranceExpiryDate': new FormControl(null, Validators.required),
      'lastServiceDate': new FormControl(null, Validators.required),
      'serviceDueDate': new FormControl(null, Validators.required),
      'price': new FormControl(null, [Validators.required,Validators.min(1),Validators.max(10000)]),
      'availability': new FormControl(),
      'number':new FormControl(null,Validators.required),
    });
    
    this.route.params.subscribe((params: Params) => {
      this.vehicleId = params['vehicleId'];
      this.vehicleService.vehicle(this.vehicleId).subscribe((vehicle: Vehicle) => {
        this.vehicleNumber=vehicle.number;
        vehicle.insuranceExpiryDate = new Date(vehicle.insuranceExpiryDate);
        vehicle.serviceDueDate = new Date(vehicle.serviceDueDate);
        vehicle.lastServiceDate = new Date(vehicle.lastServiceDate);
        if (vehicle) {
          this.editForm.patchValue({
            imageUrl :vehicle.imageUrl,
            price: vehicle.price,
            insuranceExpiryDate: vehicle.insuranceExpiryDate.toISOString().slice(0, 10),
            lastServiceDate: vehicle.lastServiceDate.toISOString().slice(0, 10),
            serviceDueDate: vehicle.serviceDueDate.toISOString().slice(0, 10),
            type: vehicle.type,
            availability: vehicle.availability,
            name: vehicle.name,
            number:vehicle.number
          })
        } else {
          this.router.navigate(['vehicles']);
        }
      });
    })
  }
  onSubmit() {
    this.vehicle = {
      number:this.editForm.value.number,
      vehicleId: this.vehicleId,
      name: this.editForm.value.name,
      insuranceExpiryDate: this.editForm.value.insuranceExpiryDate,
      lastServiceDate: this.editForm.value.lastServiceDate,
      serviceDueDate: this.editForm.value.serviceDueDate,
      price: this.editForm.value.price,
      type: this.editForm.value.type,
      availability: this.editForm.value.availability,
      imageUrl: this.editForm.value.imageUrl
    }

    console.log("\n\nEdited Value for Submission\n", this.vehicle)
    this.vehicleService.update(this.vehicle).subscribe((data => {
      if (data) {
        this.vehicleEdited = true;
        setTimeout(() => {
          this.vehicleEdited = false;
          this.router.navigate(['/vehicles']);
        }, 1000);
      } else {
        this.vehicleEdited = false;
      }
    }))
  }
  isAdmin() {
    return this.authService.isAdmin;
  }
  userTaken() {
    let email = this.editForm.get('number').value;
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
      console.log(this.vehicleNumber,email)
      if(email===this.vehicleNumber){
      this.userNameTaken = true;
      }else{
        this.userNameTaken = data;
      }
    });
  }
}
