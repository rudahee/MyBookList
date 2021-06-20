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

  /**
   * Creates an instance of AddBookToListComponent.
   * @param {ActivatedRoute} router
   * @param {BookService} bookService
   * @param {FormBuilder} build
   * @param {Location} location
   * @param {MatSnackBar} snackBar
   * @memberof AddBookToListComponent
   *
   * @author J. Rubén Daza
   */
  constructor(private router: ActivatedRoute, private bookService: BookService,
              private build: FormBuilder, private location: Location,
              private snackBar: MatSnackBar) { }

  /**
   * Initialize data and form
   *
   * @memberof AddBookToListComponent
   *
   * @author J. Rubén Daza
   */
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
  addToList(): void {
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

    // Send data
    this.bookService.addBookToList(data).subscribe(
      () => {
        this.location.back();
        this.snackBar.open('Successfully added to your list', 'Close', { duration: 5000, panelClass: 'snackbar' });
      }
    );
  }
}
