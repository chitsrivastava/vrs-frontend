import { Vehicle } from './vehicle.model';

export interface Booking{
    bookingId:number;
    vehicle:Vehicle;
    startDate:Date;
    endDate:Date;
    bookingDate:Date;
    status:string;
}