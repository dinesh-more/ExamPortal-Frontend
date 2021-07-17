import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public getCurrentUser() {
    return this.http.get(baseURL + 'current-user');
  }

  //Authenticate
  public authenticateAPI(loginDetails: any) {
    return this.http.post(baseURL + 'authenticate', loginDetails);
  }

  public userLoggedIn(token) {
    localStorage.setItem("token", token);
    return true;
  }

  public isLoggedIn() {
    let token = localStorage.getItem("token");
    if (token == undefined || token == '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  public isLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return true;
  }

  public setUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  public getUser() {
    let userDetails = localStorage.getItem("user");
    if (userDetails != null) {
      return JSON.parse(userDetails);
    } else {
      this.isLoggedOut();
      return null;
    }
  }

  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
