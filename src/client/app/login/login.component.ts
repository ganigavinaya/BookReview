import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', './font-awesome.min.css']
})
export class LoginComponent implements OnInit {
  userdata: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService,) { }

  ngOnInit() {
    // reset login status
    this.userservice.logout();

  }

  login() {

    this.userservice.login(this.userdata.username, this.userdata.password)
      .subscribe(
        data => {
          console.log('Success');
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
        });
  }
}
