// import { Component, OnInit, DefaultIterableDiffer } from '@angular/core';
// import { Vehicle } from 'src/model/vehicle.model';
// import { Router, ActivatedRoute, Params } from '@angular/router';
// import { VehicleService } from 'src/app/service/vehicle.service';
// import { AuthService } from 'src/app/service/auth.service';

// @Component({
//   selector: 'app-vehicle-details',
//   templateUrl: './vehicle-details.component.html',
//   styleUrls: ['./vehicle-details.component.css']
// })
// export class VehicleDetailsComponent implements OnInit {

  
//   startDate:Date;
//   numberOfDays:number; 
//   vehicle: Vehicle;
//   vehicleId: number;
//   daletedSuccess: boolean = false;
//   constructor(private route: ActivatedRoute, private router: Router, private vehicleService: VehicleService, private authService: AuthService) { }


//   ngOnInit() {
//     this.route.params.subscribe((params: Params) => {
//       this.vehicleId = params['vehicleId'];
//     });

//     this.vehicleService.vehicle(this.vehicleId).subscribe((data: Vehicle) => {
//       this.vehicle = data;
//       console.log(this.vehicle)
//     })
//   }

//   isAdmin() {
//     if (this.authService.loggedIn && this.authService.isAdmin) {
//       return true;
//     }
//     return false;
//   }
// bookVehicle(){  //booking/{email}/{vehicleId}/{startDate}/{days}
//   this.vehicleService.bookVehicle(this.authService.emailAuthenticated,this.vehicleId,this.startDate,this.numberOfDays).subscribe(data=>{
// console.log(data);
//   })

// }
//   removeVehicle(vehicleId: number) {

//     this.vehicleService.remove(vehicleId).subscribe((data) => {
//       if(data){
//         this.router.navigate(['/vehicles'])
//       }
//     }

//     );

//   }

// }
