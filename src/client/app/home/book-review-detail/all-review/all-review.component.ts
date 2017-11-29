import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserBookService} from '../../../services/user-book.service';
import {UserBook} from '../../../models/user-book';

@Component({
  selector: 'app-review',
  templateUrl: './all-review.component.html',
  styleUrls: ['./all-review.component.css']
})
export class AllReviewComponent implements OnInit {

  @Input() bookId: string;
  allReview: UserBook[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userbookservice: UserBookService) {}

  ngOnInit() {
    this.userbookservice.getAllReviewsForBook(this.bookId).subscribe(
      data => {
        this.allReview = data;
      },
      error => {
        console.log('error');
      }
    );
  }

  reloadData() {
    this.userbookservice.getAllReviewsForBook(this.bookId).subscribe(
      data => {
        this.allReview = data;
      },
      error => {
        console.log('error');
      }
    );

  }




}
