import { Booking } from './booking.model';
import { Transaction } from './transaction.model';
import { Wallet } from './wallet.model';

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    vendorId?: number;
    age: number;
    gender: string;
    contactNumber: number;
    isApproved?: boolean;
    wallet?: Wallet;
    transactionList?:Transaction[];
    bookingList?:Booking[]
    accessToken?: string;
}
