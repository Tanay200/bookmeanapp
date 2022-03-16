import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public authenticationService:AuthenticationService,
    private router:Router,
    private flashMessageService:FlashMessagesService    ) { }

  ngOnInit(): void {
  }

  onLogOutClick()
  {
    this.authenticationService.logout();
    this.flashMessageService.show("You are Logged Out",{cssClass:'alert-success',timeout:3000});
    this.router.navigate(['/login']);
    return true;
  }
}
