import { Injectable } from '@angular/core';
import {Http, RequestOptionsArgs, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {UserBook} from '../models/user-book';
import {ReviewRequest} from '../models/reviewRequest';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class FavService {
  constructor(private http: Http) { }

  bookPrefix = 'http://localhost:4000';
  getAllFavoritesForUser(_id: string) {
    return this.http.get(this.bookPrefix + '/userbook/' + _id).map((response: Response) => response.json());
  }

  getBookUserReviews(req: ReviewRequest) {
    const params = new HttpParams().set('bookId', req.bookId).set('userId', req.userId);
    return this.http.get(this.bookPrefix + '/userbook/user?bookId=' + req.bookId + '&userId=' +  req.userId)
      .map((response: Response) => response.json());
  }

  addReview(review: UserBook) {
    return this.http.post(this.bookPrefix + '/userbook/add/', review);
  }

}
