import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-approve-user',
  templateUrl: './approve-user.component.html',
  styleUrls: ['./approve-user.component.css']
})
export class ApproveUserComponent implements OnInit {

  approvedUser: User[];
  unApprovedUser: User[];

  constructor(private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.userService.getApprovedUser().subscribe((data: User[]) => {
      this.approvedUser = data;
      console.log(this.approvedUser, "\n\n", data);
    })
    this.userService.getUnapprovedUser().subscribe((data: User[]) => {
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
