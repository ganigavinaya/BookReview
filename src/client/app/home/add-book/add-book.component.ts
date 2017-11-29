import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {BookService} from '../../services/book.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit{

  bookdata: any = {};
  loading = false;
  form: FormGroup;
  pageTitle = 'Add Book';

  @ViewChild('fileInput') fileInput: ElementRef;


  ngOnInit() {
    if (location.pathname.split('/')[2] === 'update') {
      this.pageTitle = 'Update Book';
    }

  }
  constructor (private router: Router,
               private bookService: BookService, @Inject(FormBuilder) fb: FormBuilder) {

    this.form = fb.group({
      title: '',
      desc: '',
      authors: '',
      genre: '',
      image: null
    });
  }

  onSave() {

    if (this.bookdata.title === '') {
      document.getElementById('error').innerText = 'Please enter book title';
    } else {
      // if ( isUndefined(this.bookdata.image)) {
      //   document.getElementById('error').innerText = 'Please upload an image';
      //   return;
      // }
      this.bookService.createBook(this.bookdata)
        .subscribe(
          data => {},
          error => {
            document.getElementById('error').innerText = 'book create error';
            console.log('book create error');
          });
    }

  }

  onFileChange(event) {
    let reader = new FileReader();
    if ( event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('image').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }

  onSubmit() {
    if (this.bookdata.title === '') {
      document.getElementById('error').innerText = 'Please enter book title';
    } else {
      const formModel = this.form.value;
      this.loading = true;
      console.log(formModel);
      this.bookService.createBook(formModel)
        .subscribe(
          data => {
            this.loading = false;
            if (this.pageTitle = 'Update Book') {
              this.router.navigate(['/home']);
            }
          },
          error => {
            document.getElementById('error').innerText = 'book create error';
            console.log('book create error');
          });
    }
  }

  clearFile() {
    this.form.get('image').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
