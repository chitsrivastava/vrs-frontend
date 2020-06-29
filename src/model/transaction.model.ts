import {Coupon} from "./coupon.model";

export interface Transaction{
    transactionId:number;
    type:string;
    amount:number;
    coupon:Coupon

  ;
}
