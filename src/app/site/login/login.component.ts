import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  resetSuccessfull:boolean=false;
  numberVerified:boolean=false;
  isVerifyClicked:boolean=false;
  forgotPassword=false;
  isUserApproved = true;
  isLoginValid = true;
  authSource: string;
  resetPasswordForm:FormGroup;
  user_email:string="";
  constructor(private router: Router, private route: ActivatedRoute, private userService:UserService,private authService: AuthService) { }

  ngOnInit() {
    if(this.authService.loggedIn){
      this.router.navigate(['/vehicles'])
    }
    this.resetSuccessfull=false;
    this.isLoginValid = true;
    this.isUserApproved=true;
    this.numberVerified=false;
    this.authSource = this.authService.authSource
    this.resetPasswordForm = new FormGroup({
      'resetEmail' : new FormControl(null,  [Validators.required, Validators.email]),
      'number' : new FormControl(null,  [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      'otp':new FormControl(null,[Validators.required,Validators.minLength(4),Validators.maxLength(4)]),
      'newPassword' : new FormControl(null,Validators.required)
    })
  }

  onSubmit(form: NgForm) {
    this.forgotPassword=false;
    this.isUserApproved = true;
    this.authSource = ''
    this.authService.authSource = '';
    const username = form.value.username;
    const password = form.value.password;

    if(username==='superadmin' && password==='password'){
      this.router.navigate(['/super-admin'])
      this.authService.loggedIn=true;
      return;
    }

    if (username === 'Chitransh') {
      this.isLoginValid = false;
    } else {
      this.authService.logIn(username, password).subscribe((data) => {

        this.authService.accessToken = data['token'];
        localStorage.setItem("token",data['token']);

        if(!this.authService.accessToken){
          this.authService.loggedIn = false;
          this.isUserApproved = false;
          return;
        }
        localStorage.setItem("username", username);
        this.authService.isAdmin = data['role'] == 'ROLE_ADMIN' ? true : false;
        localStorage.setItem("isAdmin",String(this.authService.isAdmin));
        this.authService.loggedIn = true;
        this.userService.getUser(username).subscribe((data:User)=>{
          this.authService.userAuthenticated =data;
          this.authService.userAuthenticated.accessToken = this.authService.accessToken;
        });
        this.authService.emailAuthenticated=username;
        if(this.authService.isAdmin){
          this.userService.getAdminNotificationRegardingVehicles().subscribe();
        }
        this.router.navigate(['/vehicles']);
      }, (error) => {
        this.isLoginValid = (error['status'] == 401) ? false : true;
        setTimeout(()=>{
          this.isLoginValid=true;
        },2000)
      });
    }
  }
  setApproved(){
    this.isUserApproved=true;
  }

  enableResetForm(){
    this.resetSuccessfull=false;
    this.resetPasswordForm.get('resetEmail').setValue(this.user_email);
    this.forgotPassword=true;
  }

  verifyNumber(){
    setTimeout(()=>this.isVerifyClicked=false,1000)
    return this.authService.verifyNumber(this.resetPasswordForm.get('resetEmail').value,this.resetPasswordForm.get('number').value ).subscribe((data:boolean)=>{
      this.numberVerified = data;
      this.isVerifyClicked = true;
    })
  }
  resetPassword(){
    this.authService.resetPassword(this.resetPasswordForm.get('resetEmail').value,this.resetPasswordForm.get('newPassword').value).subscribe((data:boolean)=>{
     this.resetSuccessfull=data;
    })
    setTimeout(()=>{  this.isLoginValid = true;
      this.forgotPassword=false;
      this.numberVerified=false;
      this.isVerifyClicked = false;
      this.resetPasswordForm.reset();
    },2000)
  }

}
