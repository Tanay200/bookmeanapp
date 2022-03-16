import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService) { }

  user:any;
  ngOnInit(): void {
    this.user=this.authenticationService.loadUserData();
    console.log(this.user);

  }

}
