import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { Notification } from 'src/model/notification.model';
import { AuthService } from 'src/app/service/auth.service';
import { User } from 'src/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private router:Router,private userService: UserService, private authService:AuthService) { }
  allNotificationsCleared=false;
  notifications: Notification[];
  ngOnInit() {
    this.allNotificationsCleared=false;
    this.userService.getUserNotification(this.authService.emailAuthenticated).subscribe((data:Notification[])=>{
      this.notifications =data;
    });
  }

  isAdmin(){
    return this.authService.isAdmin;
  }

  deleteNotification(id: number) {
    this.userService.deleteNotification(id).subscribe((data: boolean) => {
      if (data) {
        this.ngOnInit();
      }
    });
  }

  manageNotification(id:number){
    let notification  = this.notifications.find((notification=>notification.id==id));
    let vehicleId = (notification.message.substring(notification.message.indexOf(':')+1,notification.message.indexOf(')'))).trim() 
    if(vehicleId.length!=0){
      console.log("Notification" ,vehicleId,vehicleId.length)
      this.router.navigate(['/edit',vehicleId])
    }
    else{
      this.router.navigate(['/approve'])
    }
  }

  clearNotification(){
    this.userService.clearNotifications().subscribe(data=>{
      if(data){
        this.allNotificationsCleared=true;
      }
    });
  }
}
