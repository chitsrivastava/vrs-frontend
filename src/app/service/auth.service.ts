import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { User } from 'src/model/user.model';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:string=environment.baseUrl;
  loggedIn = false;
  isAdmin = false;
  redirectUrl: string = '/';
  userAuthenticated: User;
  emailAuthenticated:string;
  authSource: string = '';
  accessToken: string;

  constructor(private router:Router,private httpService: HttpClient) {
    this.accessToken = localStorage.getItem("token");
  }

  logIn(username: string, password: string): Observable<any> {
    let header = new HttpHeaders();
    header = header.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    return this.httpService.get(`${this.baseUrl}/authenticate`, { headers: header })
  }

  logOut() {
    this.redirectUrl = '/';
    this.router.navigate(['/vehicles']);
    this.loggedIn = false;
    localStorage.clear();
    this.isAdmin=false;
  }

  isUserAdmin() {
    return this.isAdmin;
  }
  verifyNumber(email:string,contactNumber:number){
    return this.httpService.get(`${this.baseUrl}/users/numberValid/${email}/${contactNumber}`)
  }
  resetPassword(email:string ,password: string) {
    return this.httpService.put(`${this.baseUrl}/users/reset/${email}`,password);
  }


}
