import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ElementRef, ViewChild } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AppRoutingModule} from './app-routing.module';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserService} from './services/user.service';
import {HttpModule} from '@angular/http';
import {HomeComponent} from './home/home.component';
import {HomeHeaderComponent} from './home/home-header/home-header.component';
import {AuthGuard} from './guard/auth.guard';
import {DropdownDirective} from './directives/dropdown.directive';
import {AddBookComponent} from './home/add-book/add-book.component';
import {BookListComponent} from './home/book-list/book-list.component';
import { ImageUploadModule } from 'angular2-image-upload';
import {BookService} from './services/book.service';
import {BookComponent} from './home/book-list/book/book.component';
import {StarRatingModule} from '../../../node_modules/angular-star-rating';
import {BookReviewComponent} from './home/book-review-detail/book-review.component';
import {UserBookService} from './services/user-book.service';
import {PasswordStrengthBarModule} from 'ng2-password-strength-bar';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HomeHeaderComponent,
    DropdownDirective,
    AddBookComponent,
    BookListComponent,
    BookComponent,
    BookReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ImageUploadModule.forRoot(),
    StarRatingModule.forRoot(),
    PasswordStrengthBarModule
  ],
  providers: [FormBuilder, UserService, AuthGuard, BookService, UserBookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
