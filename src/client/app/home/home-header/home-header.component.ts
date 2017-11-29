import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.css']
})
export class HomeHeaderComponent implements OnInit {

  @Output() featureSelected = new EventEmitter<string>();

  username = '';
  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
  }
  constructor(private router: Router,
              private userService: UserService) { }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  checkUserName() {

    if (this.username === 'admin') {
      return true;
    }
    return false;
  }

}
