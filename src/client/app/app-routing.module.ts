import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './guard/auth.guard';
import {AddBookComponent} from './home/add-book/add-book.component';
import {BookListComponent} from './home/book-list/book-list.component';
import {BookReviewComponent} from './home/book-review-detail/book-review.component';
import {FavoriteComponent} from './home/favorites/favorite.component';

const appRoutes: Routes = [
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
      { path: '', component: BookListComponent },
      { path: 'addBook', component: AddBookComponent },
      { path: 'update/:id', component: AddBookComponent },
      { path: 'fav', component: FavoriteComponent },
      { path: ':id', component: BookReviewComponent }

    ]
  },
  {
    path: 'addBook', component: AddBookComponent, canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
