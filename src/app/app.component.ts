import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import {error} from "util";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private authService:AuthService,public router:Router,){

  }
  ngOnInit(){

    this.testConnection();
    let token = localStorage.getItem("token");
    if(token!=null){
      this.authService.accessToken = token;
      this.authService.emailAuthenticated = localStorage.getItem("username");
      this.authService.isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
      console.log(this.authService.isAdmin);
      this.authService.loggedIn=true;
  }

  window.addEventListener('storage',(event)=>{
    if(event.storageArea == localStorage){

      let token = localStorage.getItem('token');

      if(token == undefined){
        this.authService.logOut();
        this.router.navigate(['/vehicles']);
      }
    }
  })
}
  title = 'vehicle-reservation-system-webapp';

  private testConnection() {
    this.authService.resetPassword("test-connection","test-connection").subscribe(data=>{},(error:Response)=>{
      if(error.status==0){
        this.router.navigate(['error'])
      }
    })
  }
}
