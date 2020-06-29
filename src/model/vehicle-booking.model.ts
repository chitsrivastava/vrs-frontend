import { Booking } from './booking.model';

export interface VehicleBooking{
    email:string;
    contactNumber:number;
    booking:Booking;
}