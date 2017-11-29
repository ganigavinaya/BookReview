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
  newArray: Book[];
  currentPage = 0;
  pageSize = 1;
  numberOfPages = 1;
  nextDis = false;
  prevDis = false;
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
          this.numberOfPages = this.calculateNumberOfPages();
          this.startFrom();
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
          this.numberOfPages = this.calculateNumberOfPages();
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

  calculateNumberOfPages() {
    return Math.ceil(this.booklist.length / this.pageSize);
  }

  decreaseCurrentPage() {
    if (this.currentPage <= 1) {
      this.prevDis = true;
    } else {
      this.nextDis = false;
      this.currentPage = this.currentPage - 1;

      this.startFrom();
    }
  }

  increaseCurrentPage() {
    if (this.currentPage >= this.numberOfPages - 1) {
      this.nextDis = true;
    } else {
      this.prevDis = false;
      this.currentPage = this.currentPage + 1;

      this.startFrom();
    }
  }

  startFrom() {
    const temp = this.pageSize * this.currentPage;
    this.newArray = this.booklist.slice(this.pageSize * this.currentPage, this.pageSize + temp);
    console.log(this.newArray.length);
  }
}
