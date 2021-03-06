import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';
import {UserBookService} from '../../services/user-book.service';
import {UserBook} from '../../models/user-book';
import {ReviewRequest} from '../../models/reviewRequest';
import {AllReviewComponent} from './all-review/all-review.component';
import {FavService} from '../../services/fav.service';
import {Fav} from '../../models/fav';

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css']
})
export class BookReviewComponent implements OnInit {

  book: Book;
  favorite: boolean;
  favObj: Fav = {_id: '', userId: '', bookId: ''};
  reviewInst: UserBook;
  @ViewChild(AllReviewComponent)
  private allreview: AllReviewComponent;

  allowAdd = false;
  constructor (private route: ActivatedRoute,
               private router: Router,
               private bookservice: BookService,
               private userbookservice: UserBookService,
               private favservice: FavService) {}


  ngOnInit() {

    this.reviewInst = {_id : '', userId: JSON.parse(localStorage.getItem('currentUser'))._id,
      bookId: location.pathname.split('/')[2],
      rating: null,
      review: ''};

    this.bookservice.getBookByID(this.reviewInst.bookId).subscribe(
      data => {
        this.book = data;
      },
      error => {
        console.log('error');
      }
    );

    const req: ReviewRequest = {bookId: this.reviewInst.bookId, userId : this.reviewInst.userId};
    this.userbookservice.getBookUserReviews(req).subscribe(
      data => {
        this.reviewInst = data;
        this.allowAdd = false;
      },
      error => {
        this.allowAdd = true;
        console.log('no review');
      }
    );

    this.favservice.getOneForUser(this.reviewInst.userId, this.reviewInst.bookId).subscribe(
      data => {
        this.favorite = true;
      },
      error => {
        this.favorite = false;
        console.log('not fav');
      }
    );
  }


  addReview() {
    if (this.reviewInst.rating > 5) {
      this.reviewInst.rating = 5;
    } else if (this.reviewInst.rating < 0) {
      this.reviewInst.rating = 0;
    }
    this.userbookservice.addReview( this.reviewInst ).subscribe(
      data => {
       console.log('review added');
        this.allowAdd = false;
        this.allreview.reloadData();
      },
      error => {
        this.allowAdd = true;
        console.log('error');
      }
    );

  }

  changeFav($event) {

    if ($event.target.checked) {

      this.favObj.userId = this.reviewInst.userId;
      this.favObj.bookId = this.reviewInst.bookId;
      this.favservice.addFav(this.favObj).subscribe(
        data => {
          // this.favorite = true;
        },
        error => {
          this.favorite = false;
          console.log('error');
        }
      );
    } else {
      this.favservice.delFav(this.reviewInst.userId, this.reviewInst.bookId).subscribe(
        data => {
          // this.favorite = false;
        },
        error => {
          console.log('error');
        }
      );
    }
  }

  checkRating() {
    if (this.reviewInst.rating > 5 ) {
      this.reviewInst.rating = 5;
    } else if ( this.reviewInst.rating < 0) {
      this.reviewInst.rating = 0;
    }
  }


}
