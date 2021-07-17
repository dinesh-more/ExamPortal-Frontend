import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: any = {};

  constructor(private _userservice: UserService) { }

  ngOnInit(): void {
  }

  registerUser() {
    this._userservice.addUser('user/createUser', this.user).subscribe(
      (data: any) => {
        //success
        console.log(data);
        Swal.fire({
          icon: 'success',
          title: 'Successfully...',
          text: 'Registered'
        });
      },
      (error) => {
        //error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Username Already Present...',
          // footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    )
  }

  // registerUser(userForm){
  //   if(this.user != null || userForm != null) {
  //     this._userservice.addUser('user/createUser',this.user).subscribe(
  //       (data: any)=>{
  //         //success
  //         console.log(data);
  //         Swal.fire('Successfully','Registered', 'success');
  //       },
  //       (error)=>{
  //         //error
  //         alert('Something went wrong'+error);
  //       }
  //     )
  //   }
  // }

}
