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
  title = '';
  desc = '';
  authors = '';
  genre = '';
  image = null;
  isUpload = false;
  id = '';

  @ViewChild('fileInput') fileInput: ElementRef;


  ngOnInit() {
    const locationArray = location.pathname.split('/');
    if (locationArray[2] === 'update') {
      this.pageTitle = 'Update Book';
      this.isUpload = true;
      this.id = locationArray[3]
      this.bookService.getBookByID(this.id).subscribe(
        data => {
          this.title = data.title;
          this.desc = data.desc;
          this.authors = data.authors;
          this.genre = data.genre;
          this.image = data.image;
          this.loading = true;
        },
        error => {
          console.log('error');
        }
      );
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

  onFileChange(event) {
    let reader = new FileReader();
    if ( event.target.files && event.target.files.length > 0) {

      let file = event.target.files[0];

      if (this.isUpload && file == null) {
        this.form.get('image').setValue(this.image);
      }
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('image').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
        this.loading = true;
        this.image = this.form.get('image').value;
      };
    }
  }

  onSubmit() {
    if (this.bookdata.title === '') {
      document.getElementById('error').innerText = 'Please enter book title';
    } else {
      const formModel = this.form.value;
      console.log(formModel);

      if (this.isUpload) {
        let event = new Event('change');

        document.getElementById('image').dispatchEvent(event);
        this.bookService.updateBook(this.id, formModel)
          .subscribe(
            data => {
              if (this.isUpload) {
                this.router.navigate(['/home']);
              }
            },
            error => {
              document.getElementById('error').innerText = 'book create error';
              console.log('book create error');
            });
      } else {
        this.bookService.createBook(formModel)
          .subscribe(
            data => {
              if (this.isUpload) {
                this.router.navigate(['/home']);
              }
            },
            error => {
              document.getElementById('error').innerText = 'book create error';
              console.log('book create error');
            });
      }
    }
  }

  clearFile() {
    this.form.get('image').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
