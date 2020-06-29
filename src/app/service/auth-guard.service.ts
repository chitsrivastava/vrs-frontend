import { Injectable } from '@angular/core';

import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { AuthService } from './auth.service';
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  baseUrl:string=environment.baseUrl;

  constructor(private authService: AuthService, private router: Router) {

  }



  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.redirectUrl = state.url.toString();
    return Observable.create((observer: Observer<any>) => {
      if (this.authService.loggedIn) {
        observer.next(true);
      }
      else {
        this.router.navigate(['/login']);
      }
    })
  }
}
