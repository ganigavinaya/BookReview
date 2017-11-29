import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {Book} from '../models/book';

@Injectable()
export class BookService {
  constructor(private http: Http) { }

  bookPrefix = 'http://localhost:4000';
  getAllBooks() {
    return this.http.get(this.bookPrefix + '/books').map((response: Response) => response.json());
  }

  getBookByTitle(_title: string) {
    return this.http.get(this.bookPrefix + '/books/title' + _title).map((response: Response) => response.json());
  }

  getBookByID(_id: string) {
    return this.http.get(this.bookPrefix + '/books/' + _id).map((response: Response) => response.json());
  }

  createBook(book: Book) {
    return this.http.post(this.bookPrefix + '/books/add', book);
  }

  updateBook( _id: string, book: Book) {
    return this.http.put(this.bookPrefix + '/books/' + _id, book);
  }

  deleteBook(_id: string) {
    return this.http.delete(this.bookPrefix + '/books/' + _id);
  }

  searchBook(_search: string) {
    return this.http.get(this.bookPrefix + '/books/searchBook').map((response: Response) => response.json());
  }

}
