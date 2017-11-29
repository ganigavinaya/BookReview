import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';
import {UserBookService} from '../../services/user-book.service';
import {UserBook} from '../../models/user-book';
import {ReviewRequest} from '../../models/reviewRequest';

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css']
})
export class BookReviewComponent implements OnInit {

  book: Book;
  reviewInst: UserBook;

  allowAdd = false;
  constructor (private route: ActivatedRoute,
               private router: Router,
               private bookservice: BookService,
               private userbookservice: UserBookService) {}


  ngOnInit() {

    this.reviewInst = {_id : '', userId: JSON.parse(localStorage.getItem('currentUser'))._id,
      bookId: location.pathname.split('/')[2],
      rating: 5,
      review: ''};

    this.bookservice.getBookByID(this.reviewInst.bookId).subscribe(
      data => {
        this.book = data;
      },
      error => {
        console.log('error');
      }
    );
    console.log('before');
    const req: ReviewRequest = {bookId: this.reviewInst.bookId, userId : this.reviewInst.userId};
    this.userbookservice.getBookUserReviews(req).subscribe(
      data => {
        this.reviewInst = data;
        console.log('data'+data);
        this.allowAdd = false;
      },
      error => {
        this.allowAdd = true;
        console.log('error');
      }
    );
  }


  addReview() {
    console.log(this.reviewInst);
    this.userbookservice.addReview( this.reviewInst ).subscribe(
      data => {
       console.log('review added');

        // const req: ReviewRequest = {bookId: this.reviewInst.bookId, userId : this.reviewInst.userId};
        // this.userbookservice.getBookUserReviews(req).subscribe(
        //   data1 => {
        //     this.reviewInst = data1;
        //   },
        //   error => {
        //     this.allowAdd = true;
        //     console.log('error');
        //   }
        // );
      },
      error => {
        this.allowAdd = true;
        console.log('error');
      }
    );
  }


}
