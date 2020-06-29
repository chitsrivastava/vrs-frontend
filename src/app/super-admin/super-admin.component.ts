import { Component, OnInit } from '@angular/core';
import { User } from 'src/model/user.model';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrls: ['./super-admin.component.css']
})
export class SuperAdminComponent implements OnInit {

approvedUser: User[];
  unApprovedUser: User[];

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userService.getApprovedAdmin().subscribe((data: User[]) => {
      this.approvedUser = data;
      console.log(this.approvedUser, "\n\n", data);
    })
    this.userService.getUnapprovedAdmin().subscribe((data: User[]) => {
      this.unApprovedUser = [...data];
    })
  }
  isAdmin() {
    return this.authService.isAdmin;
  }

  removeUser(email:string){
    this.userService.removeUser(email).subscribe(data=>{
      if(data){
        this.ngOnInit(); 
      }
    })
  }

  approveUser(email:string){
    this.userService.approveUser(email).subscribe(data=>{
      if(data){
        this.ngOnInit();
      }
    })
  }

}
