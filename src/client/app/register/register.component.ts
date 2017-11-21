import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userdata: any = {};

  constructor(private router: Router,
              private userService: UserService) { }

  register() {

    this.userService.createUser(this.userdata)
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          console.log('registration error');
        });
  }

}
