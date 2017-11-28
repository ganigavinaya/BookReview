import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';

@Component({
  selector: 'app-book-review',
  templateUrl: './book-review.component.html',
  styleUrls: ['./book-review.component.css']
})
export class BookReviewComponent implements OnInit{

  book: Book;
  id: string;
  constructor (private route: ActivatedRoute,
               private router: Router,
               private bookservice: BookService) {}


  ngOnInit() {
    console.log("start");
    this.id = location.pathname.split('/')[3];
    this.bookservice.getBookByID(this.id).subscribe(
      data => {
        this.book = data;
      },
      error => {
        console.log('error');
      }
    );
  }


}
