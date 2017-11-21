import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../models/user';

@Injectable()
export class UserService {
  constructor(private http: Http) { }

  userPrefix = 'http://localhost:4000';
  getAllUsers() {
    return this.http.get(this.userPrefix + '/users').map((response: Response) => response.json());
  }

  getUserById(_id: string) {
    return this.http.get(this.userPrefix + '/users/' + _id).map((response: Response) => response.json());
  }

  createUser(user: User) {
    return this.http.post(this.userPrefix + '/users/register', user);
  }

  updateUser(user: User) {
    return this.http.put(this.userPrefix + '/users/' + user._id, user);
  }

  deleteUser(_id: string) {
    return this.http.delete('/users/' + _id);
  }

  login(username: string, password: string) {
    console.log(username + ' ' + password);
    return this.http.post(this.userPrefix + '/users/authenticate', { username: username, password: password })
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }


}
