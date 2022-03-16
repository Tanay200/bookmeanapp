import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  token: string | undefined
  authToken : any;
  user:any;
  jwtHelper: any;

  constructor(
    private http:HttpClient) { }

  //For Registering New User
  registerUser(user:any){

    return this.http.post('users/register',user);

  }

  //For Authentication of User
  authenticateUser(user:any)
  {
    return this.http.post('users/authenticate',user);
  }

  getProfile(){
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('users/profile',{headers:headers});
  }


  //For Storing User Data
  storeUserData(token:any,user:any){
      localStorage.setItem('id_token',token);
      localStorage.setItem('user',JSON.stringify(user));
      this.authToken = token;
      this.user=user;
  }

  loadUserData()
  {
    return localStorage.getItem('user');
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  isAuthenticated() {
    this.loadToken();
    return this.jwtHelper.isTokenExpired(this.authToken);
  }


  logout()
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
