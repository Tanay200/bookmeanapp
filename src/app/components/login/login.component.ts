import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:String="";
  password:String="";

  constructor(
    private authenticationService:AuthenticationService,
    private router:Router,
    private flashMessageService:FlashMessagesService) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user ={
      username: this.username,
      password:this.password
    }

    this.authenticationService.authenticateUser(user).subscribe(
      (data)=>{
        let resSTR = JSON.stringify(data);
        let resJSON = JSON.parse(resSTR);

        if(resJSON.success){
            this.authenticationService.storeUserData(resJSON.token,resJSON.user);
            this.flashMessageService.show("You are Logged In",{cssClass:'alert-success',timeout:3000});
            this.router.navigate(['/dashboard']);
        }
        else{
          this.flashMessageService.show(resJSON.msg,{cssClass:'alert-danger',timeout:3000});
          this.router.navigate(['/login']);
        }
      }
    )
  }

}
