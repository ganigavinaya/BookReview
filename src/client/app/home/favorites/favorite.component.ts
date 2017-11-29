import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-fav',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  username = '';

  constructor (private route: ActivatedRoute,
               private router: Router) {}

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
  }


}
