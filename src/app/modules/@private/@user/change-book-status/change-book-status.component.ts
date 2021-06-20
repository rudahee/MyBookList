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

  /**
   * Creates an instance of ChangeBookStatusComponent.
   * @param {ActivatedRoute} router
   * @param {BookService} bookService
   * @param {FormBuilder} build
   * @param {Location} location
   * @param {MatSnackBar} snackBar
   * @memberof ChangeBookStatusComponent
   *
   * @author J. Rubén Daza
   */
  constructor(private router: ActivatedRoute, private bookService: BookService,
              private build: FormBuilder, private location: Location,
              private snackBar: MatSnackBar) { }

  /**
   * Initialize form, form data and id
   *
   * @memberof ChangeBookStatusComponent
   *
   * @author J. Rubén Daza
   */
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

  /**
   * Get rating from stars. ngxStarRating
   *
   * @param {number} rating
   * @memberof AddBookToListComponent
   *
   * @author J. Rubén Daza
   */
  onRatingSet(rating: number): void {
    this.ratingDisplay = rating;
  }

  /**
   * Send data from form to service
   *
   * @memberof AddBookToListComponent
   *
   * @author J. Rubén Daza
   */
  updateBook(): void {
    const data = {
      bookId: this.id,
      userId: localStorage.getItem('user_id'),
      comment: this.addBookForm.controls.comment.value,
      status: this.addBookForm.controls.status.value,

      // if status is correct get pages readed
      // for example: If you have finished reading the book, or have not started it yet,
      // it does not make sense to send the number of pages read.

      pagesReaded: (this.addBookForm.controls.status.value !== 'PLANTOREAD'
                    && this.addBookForm.controls.status.value !== 'COMPLETED') ? this.addBookForm.controls.pages_read.value : undefined,

      score: (this.addBookForm.controls.status.value !== 'PLANTOREAD'
              && this.addBookForm.controls.status.value !== 'READING'
              && this.addBookForm.controls.status.value !== 'ONHOLD') ? this.ratingDisplay : undefined
    };

    // send data
    this.bookService.updateStatusFromBook(data).subscribe(
      () => {
        this.location.back();
        this.snackBar.open('Successfully added to your list', 'Close', { duration: 5000, panelClass: 'snackbar' });
      }
    );

  }
}
