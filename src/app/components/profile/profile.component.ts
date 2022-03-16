import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any=[];
  constructor(
    private authenticationService:AuthenticationService,
    private router:Router ) { }

  ngOnInit(): void {
    this.authenticationService.getProfile().subscribe(
      (data)=>{
        let resSTR = JSON.stringify(data);
        let profile = JSON.parse(resSTR);
        this.user=profile.user;
      },
      (err)=>{
        console.log(err);
        return false;

      }
    )
  }

}
