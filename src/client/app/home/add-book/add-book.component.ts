import {Component} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent {

  bookdata: any = {};
  selectedFile: File;
  constructor (private router: Router,
               private bookService: BookService) {}

  onSave() {

    if (this.bookdata.title === '') {
      document.getElementById('error').innerText = 'Please enter book title';
    } else {
      // if ( isUndefined(this.bookdata.image)) {
      //   document.getElementById('error').innerText = 'Please upload an image';
      //   return;
      // }

      //console.log(this.bookdata.image + 'abc');
      this.bookService.createBook(this.bookdata)
        .subscribe(
          data => {},
          error => {
            document.getElementById('error').innerText = 'book create error';
            console.log('book create error');
          });
    }

  }

  onUploadFinished(event) {
    //this.bookdata.image  = event.target.files;
  }


}
