import { Transaction } from './transaction.model';

export interface Coupon{
    couponId?:number;
    code:string;
    value:number;
    transactionList?:Transaction[];
}