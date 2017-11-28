import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {UserBook} from '../models/user-book';

@Injectable()
export class UserBookService {
  constructor(private http: Http) { }

  bookPrefix = 'http://localhost:4000';
  getAllReviewsForBook(_id: string) {
    return this.http.get(this.bookPrefix + '/userbook/' + _id).map((response: Response) => response.json());
  }

  getBookUserReviews(_id: string) {
    return this.http.get(this.bookPrefix + '/userbook/user/' + _id).map((response: Response) => response.json());
  }

  addReview(review: UserBook) {
    return this.http.post(this.bookPrefix + '/userbook/add/', review);
  }

}
