import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Vehicle } from 'src/model/vehicle.model';
import { AuthService } from './auth.service';
import { Coupon } from 'src/model/coupon.model';
import { VehicleBooking } from 'src/model/vehicle-booking.model';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class VehicleService {
  baseUrl:string=environment.baseUrl;

  filter = new Subject();

  endRide(bookingId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/users/booking/end/${bookingId}`);
  }
  cancelBooking(bookingId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/users/booking/${bookingId}`);
  }

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  vehicles(): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(`${this.baseUrl}/vehicle`)
  }

  vehiclesAdmin(): Observable<Vehicle[]> {
    return this.httpClient.get<Vehicle[]>(`${this.baseUrl}/vehicle/admin`)
  }
  vehicle(vehicleId: number): Observable<Vehicle> {
    return this.httpClient.get<Vehicle>(`${this.baseUrl}/vehicle/id/${vehicleId}`);
  }

  remove(vehicleId: number): Observable<any> {
    console.log("\n\n", vehicleId)
    return this.httpClient.delete(`${this.baseUrl}/vehicle/${vehicleId}`);
  }

  update(vehicle: Vehicle): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/vehicle`, vehicle);
  }

  add(vehicle: Vehicle): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/vehicle`, vehicle);
  }
  //booking/{email}/{vehicleId}/{startDate}/{days}
  bookVehicle(email: string, vehicleId: number, startDate: Date, days: number, couponId:number): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/users/booking/${this.authService.emailAuthenticated}/${vehicleId}/${startDate}/${days}/${couponId}`, null);
  }

  getVehicleBookings(vehicleId:number):Observable<VehicleBooking[]>{
    return this.httpClient.get<VehicleBooking[]>(`${this.baseUrl}/vehicle/booking/${vehicleId}`)
  }

  getCoupon(): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/vehicle/coupons`);
  }
  addCoupon(coupon:Coupon): Observable<boolean>{
    return this.httpClient.post<boolean>(`${this.baseUrl}/vehicle/coupons`,coupon);
  }
  couponTaken(code:string):Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/vehicle/coupons/${code}`);
  }
  removeCoupon(id:number):Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/vehicle/coupons/${id}`);
  }
  isAvailable(number:string):Observable<boolean> {
    return this.httpClient.get<boolean>(`${this.baseUrl}/vehicle/available/${number}`);
  }
}
