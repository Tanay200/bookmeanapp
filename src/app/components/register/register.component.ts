import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ValidateService } from 'src/app/services/validate.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String | undefined;
  username: String | undefined;
  email: string="";
  password: String | undefined;


  constructor(
    private validateServcie : ValidateService,
    private flashService : FlashMessagesService,
    private authenticationService:AuthenticationService,
    private router:Router) { }

  ngOnInit(): void {
  }

  onRegisterSubmit()
  {
    const user={
        name:this.name,
        username:this.username,
        email:this.email,
        password:this.password
    }

    //Validations
    if(!this.validateServcie.validateRegister(user)){
        this.flashService.show('Please Fill All Fields',{cssClass:'alert-danger',timeout:3000});
      }
    else if(!this.validateServcie.validateEmail(user.email))
    {
      this.flashService.show('Please enter a Valid Email Address',{cssClass:'alert-danger',timeout:3000});
    }

    //Register User
    this.authenticationService.registerUser(user).subscribe(
      data=>{
        if(data.valueOf())
        {
          this.flashService.show('You are now registered and can log in',{cssClass:'alert-success',timeout:5000});
          this.router.navigate(['/login']);
        }
        else{
          this.flashService.show('Went Wrong',{cssClass:'alert-danger',timeout:5000});
          this.router.navigate(['/register']);
        }
      }
    )

  }
}

