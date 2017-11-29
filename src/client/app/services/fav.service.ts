import { Injectable } from '@angular/core';
import {Http, RequestOptionsArgs, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {UserBook} from '../models/user-book';
import {ReviewRequest} from '../models/reviewRequest';
import {HttpParams} from '@angular/common/http';
import {Fav} from "../models/fav";

@Injectable()
export class FavService {
  constructor(private http: Http) { }

  bookPrefix = 'http://localhost:4000';
  getAllFavoritesForUser(_id: string) {
    return this.http.get(this.bookPrefix + '/fav/' + _id).map((response: Response) => response.json());
  }

  addFav(fav: Fav) {
    return this.http.post(this.bookPrefix + '/fav/add', fav);
  }

  getOneForUser(userId: string, bookId: string) {
    return this.http.get(this.bookPrefix + '/fav?userId=' + userId + '&bookId=' + bookId).map((response: Response) => response.json());
  }

}
