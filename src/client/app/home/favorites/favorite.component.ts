import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FavService} from '../../services/fav.service';
import {Book} from '../../models/book';
import {BookService} from '../../services/book.service';

@Component({
  selector: 'app-fav',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  userId = '';
  bookList: Array<Book> = [] ;

  constructor (private route: ActivatedRoute,
               private router: Router,
               private favservice: FavService,
               private bookservice: BookService) {}

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('currentUser'))._id;
    this.favservice.getAllFavoritesForUser(this.userId).subscribe(
      data => {

        // this.favList = data;
        data.forEach(fav => {
          this.bookservice.getBookByID(fav.bookId).subscribe(
            book => {
               this.bookList.push(book);
                console.log(this.bookList);
            },
            error2 => {
              console.log('book error');
            }
          );
        });
      },
      error => {
        console.log('error');
      }
    );
  }

  removeFav(bookId) {
    this.bookList = [];
    console.log(this.userId + ' ' + bookId);

    this.favservice.delFav(this.userId, bookId).subscribe(
      data1 => {
        this.favservice.getAllFavoritesForUser(this.userId).subscribe(
          data => {

            // this.favList = data;
            data.forEach(fav => {
              this.bookservice.getBookByID(fav.bookId).subscribe(
                book => {
                  this.bookList.push(book);
                  console.log(this.bookList);
                },
                error2 => {
                  console.log('book error');
                }
              );
            });
          },
          error => {
            console.log('error');
          }
        );
      },
      error => {
        console.log('error');
      }
    );
  }


}
