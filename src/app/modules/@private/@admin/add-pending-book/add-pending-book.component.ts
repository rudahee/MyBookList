import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { IBook, IBookForApproval } from 'app/interfaces/IBook';
import { BookService } from 'app/services/book/book.service';
import { WidgetEmitterService } from 'app/services/widget-emitter/widget-emitter.service';

@Component({
  selector: 'app-add-pending-book',
  templateUrl: './add-pending-book.component.html',
  styleUrls: ['./add-pending-book.component.scss']
})
export class AddPendingBookComponent implements OnInit {

  id: string;
  bookApproval: IBookForApproval;
  book: IBook;
  bookForm: FormGroup;
  public dateSwitch = true;

  constructor(private bookService: BookService, private location: Location, private router: ActivatedRoute,
              private build: FormBuilder, private widgetService: WidgetEmitterService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');

    this.bookForm = this.build.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      pages: ['', [Validators.required, Validators.min(10), Validators.max(3000)]],
      publishDate: [''],
      publisher: ['', [Validators.required]],
      imageUrl: ['', [Validators.required]],
      isbn: ['', [Validators.required]]
    });

    this.bookService.getBookPending(this.id).subscribe(
      res => {
        this.bookApproval = res;
        this.bookForm.controls.name.setValue(res.name);
        this.bookForm.controls.description.setValue(res.description);
        this.bookForm.controls.pages.setValue(res.pages);
        this.bookForm.controls.publishDate.setValue(res.publishDate);
        this.bookForm.controls.publisher.setValue(res.publisher);
        this.bookForm.controls.imageUrl.setValue(res.imageUrl);
        this.bookForm.controls.isbn.setValue(res.isbn);
      }
    );

  }

  public changeDateInput(): void {
    this.dateSwitch = false;
  }

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
        this.declineBook();
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

  declineBook(): void {
    this.bookService.deleteBooksPending(this.id).subscribe(
      () => {
        this.location.back();
      }
    );
  }
}
