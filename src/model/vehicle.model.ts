export interface Vehicle{
    vehicleId:number;
    number:number;
    name:string;
    imageUrl:string;
    type:string;
    insuranceExpiryDate:Date;
    lastServiceDate:Date;
    serviceDueDate:Date;
    availability:boolean;
    price:number;
}