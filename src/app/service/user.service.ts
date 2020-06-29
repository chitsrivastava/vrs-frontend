import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/model/user.model';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Notification } from 'src/model/notification.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl:string=environment.baseUrl;

  constructor(private httpClient: HttpClient, private authService:AuthService) { }
  authenticate(user: User): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/users`, user)
  }
  userAvailable(username: string): Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/users/${username}`)
  }

  getUser(email:string):Observable<User>{
    return this.httpClient.get<User>(`${this.baseUrl}/users/get/${email}`);
  }

  getUserNotification(email:string):Observable<Notification[]>{
    return this.httpClient.get<Notification[]>(`${this.baseUrl}/users/notification/${email}`);
  }

  getApprovedUser():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseUrl}/admin/approved-users`);
  }

  getUnapprovedUser():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseUrl}/admin/not-approved-users`);
  }
  removeUser(email:string):Observable<boolean>{
    return this.httpClient.get<boolean>(`${this.baseUrl}/admin/remove/${email}`);
  }
  approveUser(email:string):Observable<boolean>{
    return this.httpClient.get<boolean>(`${this.baseUrl}/admin/approve/${email}`);
  }
  getApprovedAdmin():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseUrl}/admin/approved-admin`);
  }

  getUnapprovedAdmin():Observable<User[]>{
    return this.httpClient.get<User[]>(`${this.baseUrl}/admin/not-approved-admin`);
  }

  deleteNotification(id:number):Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/users/notification/${id}`);
  }
    clearNotifications():Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/users/notification-bulk/${this.authService.emailAuthenticated}`);
  }
  getAdminNotificationRegardingVehicles():Observable<any> {
    console.log("           called")
    return this.httpClient.get<any>(`${this.baseUrl}/admin/get/notify-insurance/${this.authService.emailAuthenticated}`)
  }

}
