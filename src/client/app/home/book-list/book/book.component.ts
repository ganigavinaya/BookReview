import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Book} from "../../../models/book";
import {BookService} from "../../../services/book.service";
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  @Input() book: Book;
  username = '';
  @Output() bookDeleted = new EventEmitter<void>();

  constructor (private route: ActivatedRoute,
               private router: Router,
               private bookservice: BookService) {}

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('currentUser')).username;
  }

  delete() {
    this.bookservice.deleteBook(this.book._id)
      .subscribe(
        data => {
          console.log('book deleted');
          this.bookDeleted.emit();
        },
        error => {
          console.log(error);
        });
  }
}
