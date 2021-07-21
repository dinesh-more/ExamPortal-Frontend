import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isLoggedIn: boolean;

  profileDetails;

  constructor(private loginService: LoginService, private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.loginService.isLoggedIn();
    this.profileDetails = this.loginService.getUser();
  }

  updateUser() {
    this.userService.updateUser('user/updateUser', this.profileDetails).subscribe(
      (data: any) => {
        //success
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Successfully...',
          text: 'Updated'
        });
      },
      (error) => {
        //error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong...',
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    )
  }

}
