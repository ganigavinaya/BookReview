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

    const p = this.userdata.password;
    let _force = 0;
    const _regex = /[$-/:-?{-~!"^_`\[\]]/g; // "
    const _lowerLetters = /[a-z]+/.test(p);
    const _upperLetters = /[A-Z]+/.test(p);
    const _numbers = /[0-9]+/.test(p);
    const _symbols = _regex.test(p);

    const _flags = [_lowerLetters, _upperLetters, _numbers, _symbols];

    let _passedMatches = 0;
    for (const _flag of _flags) {
      _passedMatches += _flag === true ? 1 : 0;
    }

    _force += 2 * p.length + ((p.length >= 10) ? 1 : 0);
    _force += _passedMatches * 10;

    // penality (short password)
    _force = (p.length <= 6) ? Math.min(_force, 10) : _force;

    // penality (poor variety of characters)
    _force = (_passedMatches === 1) ? Math.min(_force, 10) : _force;
    _force = (_passedMatches === 2) ? Math.min(_force, 20) : _force;
    _force = (_passedMatches === 3) ? Math.min(_force, 40) : _force;

    if (!(_force >= 40 )) {
      document.getElementById('error').innerText = 'Password does not meet the requirement!';
      return false;
    }


      this.userService.createUser(this.userdata)
        .subscribe(
          data => {
            this.router.navigate(['/home']);
          },
          error => {
            document.getElementById('error').innerText = 'Username/ email already exists';
            console.log('registration error here');
          });


  }
}
