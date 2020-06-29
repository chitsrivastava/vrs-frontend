import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  isAuthenticated() {
    this.authService.authSource = '';
    return this.authService.loggedIn;
  }

  isAdmin() {
    console.log(this.authService.isAdmin  )
    return this.authService.isAdmin;
  }

  getUser() {
    console.log(localStorage.getItem("username"))
    return localStorage.getItem("username");
  }

  onSignOut() {
    this.authService.logOut();
  }
}
