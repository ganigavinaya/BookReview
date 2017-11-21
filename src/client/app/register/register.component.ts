import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../models/user';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userdata: User = {_id : '', name: '', email: '', username: '', password: ''};

  constructor(private router: Router,
              private userService: UserService) { }

  register() {

    this.userService.getAllUsers().subscribe(
        data => {
          if (!(this.userdata.email == '' || this.userdata.name == '' || this.userdata.username == '' || this.userdata.password == '')) {
            this.userService.createUser(this.userdata)
              .subscribe(
                data => {
                  this.router.navigate(['/home']);
                },
                error => {
                  var text = document.getElementById('error');
                  text.innerText = 'Email ID/Username already exists!';
                  console.log('registration error here');
                });
          } else {
            var text = document.getElementById('error');
            text.innerText = 'Enter all fields!';
          }

        },
        error => {
          console.log('registration error ');
        });
  }

}
