import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IBook } from 'app/interfaces/IBook';
import { BookService } from 'app/services/book/book.service';
import { NgxStarsComponent } from 'ngx-stars';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-book-to-list',
  templateUrl: './add-book-to-list.component.html',
  styleUrls: ['./add-book-to-list.component.scss']
})
export class AddBookToListComponent implements OnInit {

  addBookForm: FormGroup;
  book: IBook;
  ratingDisplay: number;
  id: string;

  @ViewChild(NgxStarsComponent)
  starsComponent: NgxStarsComponent;

  constructor(private router: ActivatedRoute, private bookService: BookService,
              private build: FormBuilder, private location: Location,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');

    this.bookService.getBook(this.id).subscribe(
      res => {
        this.book = res;
      }
    );


    this.addBookForm = this.build.group({
      comment: ['', []],
      status: ['', [Validators.required]],
      pages_read: ['', []]
    });
  }
  onRatingSet(rating: number): void {
    this.ratingDisplay = rating;
  }

  addToList(): void {
    const data = {
      bookId: this.id,
      userId: localStorage.getItem('user_id'),
      comment: this.addBookForm.controls.comment.value,
      status: this.addBookForm.controls.status.value,

      pagesReaded: (this.addBookForm.controls.status.value !== 'PLANTOREAD'
                    && this.addBookForm.controls.status.value !== 'COMPLETED') ? this.addBookForm.controls.pages_read.value : undefined,

      score: (this.addBookForm.controls.status.value !== 'PLANTOREAD'
              && this.addBookForm.controls.status.value !== 'READING'
              && this.addBookForm.controls.status.value !== 'ONHOLD') ? this.ratingDisplay : undefined
    };


    console.log(data);

    this.bookService.addBookToList(data).subscribe(
      () => {
        this.location.back();
        this.snackBar.open('Successfully added to your list', 'Close', { duration: 5000, panelClass: 'snackbar' });
      }
    );

  }
}
