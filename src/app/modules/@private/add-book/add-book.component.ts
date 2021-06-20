import { IAuthorSimple } from './../../../interfaces/IUser';
import { WidgetEmitterService } from './../../../services/widget-emitter/widget-emitter.service';
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

  /**
   * Creates an instance of AddBookComponent.
   * @param {FormBuilder} build
   * @param {JwtHandlerService} jwtTokenHandler
   * @param {BookService} bookService
   * @param {Router} router
   * @param {MatSnackBar} snackbar
   * @param {WidgetEmitterService} widgetService
   * @memberof AddBookComponent
   *
   * @author J. Rubén Daza
   */
  constructor(private build: FormBuilder, private jwtTokenHandler: JwtHandlerService,
              private bookService: BookService, private router: Router,
              private snackbar: MatSnackBar, private widgetService: WidgetEmitterService) { }


  /**
   * initialize data and form
   *
   * @memberof AddBookComponent
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
      isbn: ['', [Validators.required]]
    });
  }

  /**
   * Method mandatory for input date modal
   *
   * @memberof AddBookComponent
   *
   * @author J. Rubén Daza
   */
  public changeDateInput(): void {
    this.dateSwitch = false;
  }

  /**
   * Method to save a book, get data from for and send it to backend.
   *
   * @return {*}  {void}
   * @memberof AddBookComponent
   *
   * @author J. Rubén Daza
   */
  public saveBook(): void {
    this.book = this.bookForm.value;
    this.book.publishDate = new Date(this.bookForm.controls.publishDate.value);

    if (!this.widgetService.authorsSelected) {
      this.snackbar.open('You need to add at least one author!', 'Close', { duration: 5000, panelClass: 'snackbar'});
      return;
    }

    if (!this.widgetService.genresSelected) {
      this.snackbar.open('You need to add at least one genre!', 'Close', { duration: 5000, panelClass: 'snackbar'});
      return;
    }


    this.book.genres = this.widgetService.genresSelected;

    const authorsId = this.widgetService.authorsSelected.map(author => author.id);

    // tslint:disable-next-line: deprecation
    this.bookService.postBook(
        this.book,
       (this.widgetService.sagaSelected) ? this.widgetService.sagaSelected.id.toString() : undefined,
       authorsId)
       .subscribe(
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
