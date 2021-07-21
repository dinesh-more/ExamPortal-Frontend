import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseURL from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addUser(url: string, user: any) {
    return this.http.post(baseURL + url, user);
  }

  updateUser(url: string, profileDetails: any) {
    return this.http.put(baseURL + url, profileDetails);
  }

}
