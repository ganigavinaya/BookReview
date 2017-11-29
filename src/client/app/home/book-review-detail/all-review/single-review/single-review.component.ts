import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserBook} from '../../../../models/user-book';
import {UserService} from '../../../../services/user.service';
import {User} from '../../../../models/user';

@Component({
  selector: 'app-single-review',
  templateUrl: './single-review.component.html',
  styleUrls: ['./single-review.component.css']
})
export class SingleReviewComponent implements OnInit {

  @Input() review: UserBook;
  user: User = {_id : '', name: '', email: '', username: '', password: ''};
  constructor(private route: ActivatedRoute,
              private router: Router,
              private userservice: UserService) {}

  ngOnInit() {

    this.userservice.getUserById(this.review.userId).subscribe(
      data => {
        this.user = data;
      },
      error => {
        console.log('error');
      }
    );
  }




}
