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
    if (this.userdata.email === '' || this.userdata.name === '' || this.userdata.username === '' || this.userdata.password === '') {
      document.getElementById('error').innerText = 'Enter all fields!';
      return false;
    }


      this.userService.createUser(this.userdata)
        .subscribe(
          data => {
            this.router.navigate(['/home']);
          },
          error => {
            document.getElementById('error').innerText = error;
            console.log('registration error here');
          });


  }

}
