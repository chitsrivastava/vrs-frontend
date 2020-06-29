import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  isVendorVisible: boolean = false;
  vendorIdRequired: boolean = false;
  userNameTaken: boolean = false;
  userNameEmpty: boolean = true;
  submitStatus: boolean = false;
  signupForm: FormGroup;
  alreadyExist: boolean = false;
  role: string;
  constructor(private router:Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(45)]),
      'firstname': new FormControl(null, [Validators.required, Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(50)]),
      'lastname': new FormControl(null, [ Validators.pattern('^[a-zA-Z]+$'), Validators.maxLength(50)]),
      'password': new FormControl(null, Validators.required),
      'confirmPassword': new FormControl(null, [Validators.required, this.isConfirmPasswordMatched.bind(this)]),
      'vendorId': new FormControl(null),
      'age': new FormControl(null, [Validators.required, Validators.min(18), Validators.max(75)]),
      'gender': new FormControl('female', Validators.required),
      'contactNumber': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      'role': new FormControl('user')
    })
  }


  get email() {
    return this.signupForm.get('email');
  }

  get firstname() {
    return this.signupForm.get('firstname');
  }

  get lastname() {
    return this.signupForm.get('lastname');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  get contactNumber() {
    return this.signupForm.get('contactNumber');
  }

  get age() {
    return this.signupForm.get('age');
  }

  get gender() {
    return this.signupForm.get('gender');
  }

  get vendorId() {
    return this.signupForm.get('vendorId');
  }

  isConfirmPasswordMatched(formControl: FormControl) {
    if (this.signupForm) {
      if (formControl.value && formControl.value.length > 0 &&
        formControl.value !== this.signupForm.get('password').value) {
        return { 'nomatch': true };
      }
    }
    return null;
  }

  userTaken() {
    let email = this.signupForm.get('email').value
    if (email.length == 0) {
      return;
    }
    this.userService.userAvailable(email).subscribe((data => {

      if (email.length == 0) {
        this.userNameEmpty = true;
      }
      else {
        this.userNameEmpty = false;
      }
      this.userNameTaken = data;

    }))
  }
  onSignUp() {
    let user: User;

    user = {
      email: this.signupForm.get('email').value,
      firstName: this.signupForm.get('firstname').value,
      lastName: this.signupForm.get('lastname').value,
      password: this.signupForm.get('password').value,
      vendorId: this.signupForm.get('vendorId').value,
      age: this.signupForm.get('age').value,
      contactNumber: this.signupForm.get('contactNumber').value,
      gender: this.signupForm.get('gender').value
    }
    this.role = this.signupForm.get('role').value;
    if (this.role === "admin" && !this.isVendorValid()) {
      this.vendorIdRequired = true;
      return;
    }
    else {
      if (this.role === "user") {
        user.vendorId = null;
        this.vendorIdRequired = false;
      }
    }

    this.userService.authenticate(user).subscribe(null, (error) => {
      this.alreadyExist = (error['error']['status'] == 400) ? true : false

      if (this.alreadyExist) {
        this.submitStatus = false;
        return;
      }
    })
    //this.authService.userAuthenticated.email = user.email;
    this.authService.emailAuthenticated = user.email;
    this.submitStatus = true;
    this.signupForm.reset();
    setTimeout(()=>this.router.navigate(['/login']),1000)

  }

  isVendorValid(): boolean {
    let vendorId = this.signupForm.get('vendorId').value;
    if (vendorId && vendorId.length ===6 && vendorId>0) {
      return true;
    }
    else {
      this.vendorIdRequired = true;
      return false;
    }
  }

  setVendorVisible() {
    let role = this.signupForm.get('role').value;
    if (role === "admin") {
      this.isVendorVisible = true;
      this.vendorIdRequired = true;
    }
    else {
      this.isVendorVisible = false;
      this.vendorIdRequired = false;
    }
  }
}
