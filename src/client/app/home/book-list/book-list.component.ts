import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../../services/book.service';
import {Book} from '../../models/book';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  booklist: Book[];
  search = '';
  constructor (private route: ActivatedRoute,
               private router: Router,
               private bookservice: BookService) {}


  ngOnInit() {
    this.bookservice.getAllBooks()
      .subscribe(
        data => {
          console.log('Success');
          this.booklist = data;
          console.log(this.booklist);
        },
        error => {
          console.log(error);
        });
  }

  reloadData() {
    this.bookservice.getAllBooks()
      .subscribe(
        data => {
          console.log('Success');
          this.booklist = data;
          console.log(this.booklist);
        },
        error => {
          console.log(error);
        });
  }

  onSearch() {
    // this.bookservice.searchBook(this.search)
    //   .subscribe(
    //     data => {
    //       console.log('Success');
    //       this.booklist = data;
    //       console.log(this.booklist);
    //     },
    //     error => {
    //       console.log(error);
    //     });

    this.bookservice.searchBook(this.search)
      .subscribe(
        data => {
          console.log('Success from onSEarch');
          this.booklist = data;
          console.log(this.booklist);
        },
        error => {
          console.log(error);
        });
  }

}
