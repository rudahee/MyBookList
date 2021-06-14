import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { IBook } from 'app/interfaces/IBook';
import { BookService } from 'app/services/book/book.service';
import { NgxStarsComponent } from 'ngx-stars';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-book-status',
  templateUrl: './change-book-status.component.html',
  styleUrls: ['./change-book-status.component.scss']
})
export class ChangeBookStatusComponent implements OnInit {

  addBookForm: FormGroup;
  book: IBook;
  ratingDisplay: number;
  initialRating: number;
  id: string;

  @ViewChild(NgxStarsComponent)
  starsComponent: NgxStarsComponent;

  constructor(private router: ActivatedRoute, private bookService: BookService,
              private build: FormBuilder, private location: Location,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.addBookForm = this.build.group({
      comment: ['', []],
      status: ['', [Validators.required]],
      pages_read: ['', []]
    });


    this.id = this.router.snapshot.paramMap.get('id');

    this.bookService.getBook(this.id).subscribe(
      res => {
        this.book = res;
      }
    );

    this.bookService.getBookStatus(this.id).subscribe(
      res => {
        console.log(res);
        this.addBookForm.controls.comment.setValue(res.comment);
        this.addBookForm.controls.status.setValue(res.status);
        this.addBookForm.controls.pages_read.setValue(res.pagesReaded);
        this.initialRating = res.score;
      }
    );
  }
  onRatingSet(rating: number): void {
    this.ratingDisplay = rating;
  }

  updateBook(): void {
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

    this.bookService.updateStatusFromBook(data).subscribe(
      () => {
        this.location.back();
        this.snackBar.open('Successfully added to your list', 'Close', { duration: 5000, panelClass: 'snackbar' });
      }
    );

  }
}
