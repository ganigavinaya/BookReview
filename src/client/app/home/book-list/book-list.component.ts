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
  pageSize = 5;
  numberOfPages = 1;
  nextDis = false;
  prevDis = false;
  genreSelected = '';
  btnClass = 'btn-default';
  genreList = ['Young Adult', 'Mystery' , 'Romance' , 'Classic' , 'Fiction' , 'Chick-lit' ,
    'Thriller' , 'Humor' , 'Fantasy' , 'Contemporary'];
  constructor (private route: ActivatedRoute,
               private router: Router,
               private bookservice: BookService) {}


  ngOnInit() {
    this.bookservice.getAllBooks()
      .subscribe(
        data => {
          console.log('Success');
          this.booklist = data;
          this.numberOfPages = this.calculateNumberOfPages();
          if (this.numberOfPages <= 1 ) {
            this.nextDis = true;
          } else {
            this.nextDis = false;
          }
          this.prevDis = true;
          this.startFrom();
        },
        error => {
          console.log(error);
        });
  }

  reloadData() {
    this.genreSelected = '';
    this.search = '';
    document.getElementById('filtername').innerText = this.genreSelected;
    this.bookservice.getAllBooks()
      .subscribe(
        data => {
          console.log('Success');
          this.booklist = data;
          this.numberOfPages = this.calculateNumberOfPages();
          console.log(this.numberOfPages);
          this.currentPage = 0;
          if (this.numberOfPages <= 1 ) {
            this.nextDis = true;
          } else {
            this.nextDis = false;
          }
          this.prevDis = true;
          this.startFrom();
        },
        error => {
          console.log(error);
        });
  }

  onSearch() {
    console.log('search :' + this.search);
    console.log('genre :' + this.genreSelected);
    if (this.genreSelected === '' || (this.search === '' && this.genreSelected !== '')) {
      if (this.search === '') {
        this.search = this.genreSelected;
      }
      this.bookservice.searchBook(this.search)
        .subscribe(
          data => {
            console.log('Success from onSearch');
            this.booklist = data;
            this.numberOfPages = this.calculateNumberOfPages();
            this.currentPage = 0;
            if (this.numberOfPages <= 1 ) {
              this.nextDis = true;
            } else {
              this.nextDis = false;
            }
            this.prevDis = true;
            this.startFrom();
          },
          error => {
            console.log(error);
          });
    } else {
      this.bookservice.searchBookWithFilter(this.search, this.genreSelected)
        .subscribe(
          data => {
            console.log('Success from searchBookWithFilter');
            this.booklist = data;
            this.numberOfPages = this.calculateNumberOfPages();
            this.currentPage = 0;
            if (this.numberOfPages <= 1 ) {
              this.nextDis = true;
            } else {
              this.nextDis = false;
            }
            this.prevDis = true;
            this.startFrom();
          },
          error => {
            console.log(error);
          });
    }

  }

  filterSelected($event) {
    if ($event.target.nodeName === 'A' ) {
      this.genreSelected = $event.target.id;

      if ( this.genreList.includes(this.search)) {
        this.search = '';
      }
      document.getElementById('filtername').innerText = this.genreSelected;
    }

  }

  calculateNumberOfPages() {
    return Math.ceil(this.booklist.length / this.pageSize);
  }

  decreaseCurrentPage() {
    this.nextDis = false;
    this.currentPage = this.currentPage - 1;

    this.startFrom();

    if (this.currentPage <= 0) {
      this.prevDis = true;
    }

  }

  increaseCurrentPage() {

      this.prevDis = false;
      this.currentPage = this.currentPage + 1;

      this.startFrom();
      if (this.currentPage >= this.numberOfPages - 1) {
        this.nextDis = true;
      }

  }

  startFrom() {
    const temp = this.pageSize * this.currentPage;
    this.newArray = this.booklist.slice(temp, this.pageSize + temp);
    console.log(this.newArray);
  }
}
