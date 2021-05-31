import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IBook } from 'app/interfaces/IBook';
import { BookService } from 'app/services/book/book.service';
import { JwtHandlerService } from 'app/services/jwt-token/jwt-handler.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {


  public dateSwitch = true;

  book: IBook;
  bookForm: FormGroup;
  authorId: string;

  constructor(private build: FormBuilder, private jwtTokenHandler: JwtHandlerService,
              private bookService: BookService, private router: Router, private snackbar: MatSnackBar) { }

  ngOnInit(): void {

    const route = this.router.url;

    if (route.includes('author')) {
      this.authorId = this.jwtTokenHandler.getUID();
    } else {
      this.authorId = undefined;
    }

    this.bookForm = this.build.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      pages: ['', [Validators.required, Validators.min(10), Validators.max(3000)]],
      publishDate: [''],
      publisher: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      isbn: ['', [Validators.required]]
    });
  }

  public changeDateInput(): void {
    this.dateSwitch = false;
  }

  public saveBook(): void {
    this.book = this.bookForm.value;
    this.book.publishDate = new Date(this.bookForm.controls.publishDate.value);
    // tslint:disable-next-line: deprecation
    this.bookService.postBook(this.book).subscribe(
      res => {
        this.bookForm.reset();
        this.snackbar.open('Successfully Added', 'Close', { duration: 5000, panelClass: 'snackbar'});
      }, err => {
        if (err.error.message !== '' && err.error.message !== undefined) {
          this.snackbar.open(err.error.message, 'Close', { duration: 5000, panelClass: 'snackbar'});
        } else {
          this.snackbar.open('ISBN Duplicated', 'Close', { duration: 5000, panelClass: 'snackbar'});
        }
      }
    );
  }

}
