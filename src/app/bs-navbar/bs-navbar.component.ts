import { Observable } from 'rxjs'
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser:AppUser;
  constructor(private auth:AuthService,private route:Router) {
    auth.appUser$.subscribe(appUser => this.appUser=appUser);
   }
 
  logout(){
    this.auth.logout();
  }

}
