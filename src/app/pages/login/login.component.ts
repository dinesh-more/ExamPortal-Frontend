import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginDetails: any = {};

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm() {

    if (this.loginDetails.username.trim() == '' || this.loginDetails.username != null) {
      // Swal.fire({
      //   icon: 'error',
      //   // title: 'Oops...',
      //   text: 'Username Required',
      //   // footer: '<a href="">Why do I have this issue?</a>'
      // })
      this.loginService.authenticateAPI(this.loginDetails).subscribe(
        (data: any) => {

          this.loginService.userLoggedIn(data.token);

          this.loginService.getCurrentUser().subscribe(
            (user: any) => {
              this.loginService.setUser(user);

              if (this.loginService.getUserRole() == 'ADMIN') {
                this.router.navigate(['admin-dashboard']);
              } else if (this.loginService.getUserRole() == 'NORMAL') {
                this.router.navigate(['user-dashboard']);
              } else {
                this.loginService.isLoggedOut();
                location.reload();
              }
            },
            (error) => {
              alert("Current User Fetching Failed" + error);
            }
          )

        },
        (error) => {
          Swal.fire({
            icon: 'error',
            // title: 'Oops...',
            text: 'Invalid Credentials',
            // footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      )
    }

  }

}
