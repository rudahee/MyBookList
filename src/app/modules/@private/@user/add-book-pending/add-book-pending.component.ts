import { IBookForApproval } from './../../../../interfaces/IBook';
import { Component, OnInit } from '@angular/core';
import { IBook } from 'app/interfaces/IBook';
import { Router } from '@angular/router';
import { BookService } from 'app/services/book/book.service';
import { JwtHandlerService } from 'app/services/jwt-token/jwt-handler.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-book-pending',
  templateUrl: './add-book-pending.component.html',
  styleUrls: ['./add-book-pending.component.scss']
})
export class AddBookPendingComponent implements OnInit {


  public dateSwitch = true;

  book: IBookForApproval;
  bookForm: FormGroup;
  authorId: string;

  /**
   * Creates an instance of AddBookPendingComponent.
   * @param {FormBuilder} build
   * @param {JwtHandlerService} jwtTokenHandler
   * @param {BookService} bookService
   * @param {Router} router
   * @param {MatSnackBar} snackBar
   * @memberof AddBookPendingComponent
   *
   * @author J. Rubén Daza
   */
  constructor(private build: FormBuilder, private jwtTokenHandler: JwtHandlerService,
              private bookService: BookService, private router: Router, private snackBar: MatSnackBar) { }


  /**
   * Initialize form
   *
   * @memberof AddBookPendingComponent
   *
   * @author J. Rubén Daza
   */
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
      isbn: ['', [Validators.required]],
      notes: ['', [Validators.required]],
      references1: ['', [Validators.required]],
      references2: ['', [Validators.required]],
      sagaName: [''],
      authorName: ['', [Validators.required]]
    });
  }

  /**
   * Method mandatory for date input modal.
   *
   * @memberof AddBookPendingComponent
   *
   * @author J. Rubén Daza
   */
  public changeDateInput(): void {
    this.dateSwitch = false;
  }

  /**
   * Get data from form and send it to service.
   *
   * @memberof AddBookPendingComponent
   *
   * @author J. Rubén Daza
   */
  public saveBook(): void {
    this.book = this.bookForm.value;

    // tslint:disable-next-line: deprecation
    this.bookService.postBookForApproval(this.book).subscribe(
      res => {
        this.snackBar.open('Successful update. You will receive an email with the answer', 'Close',
                            { duration: 5000, panelClass: 'snackbar'});
        this.bookForm.reset();
      }, err => {
        if (err.error) {
          this.snackBar.open(err.error.message, 'Close', { duration: 5000, panelClass: 'snackbar' });
        } else {
          this.snackBar.open('Unexpected Error', 'Close', { duration: 5000, panelClass: 'snackbar' });
        }
      }
    );
  }

}
