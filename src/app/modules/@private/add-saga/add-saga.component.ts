import { BookService } from 'app/services/book/book.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ILoginData } from 'app/interfaces/IUser';
import { JwtHandlerService } from 'app/services/jwt-token/jwt-handler.service';
import { UserService } from 'app/services/user/user.service';
import { ISaga } from 'app/interfaces/IBook';

@Component({
  selector: 'app-add-saga',
  templateUrl: './add-saga.component.html',
  styleUrls: ['./add-saga.component.scss']
})
export class AddSagaComponent implements OnInit {

  addSagaForm: FormGroup;
  saga: ISaga;

  constructor(private build: FormBuilder, private bookService: BookService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.addSagaForm = this.build.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  addSaga(): void {
    this.saga = this.addSagaForm.value;

    // tslint:disable-next-line: deprecation
    this.bookService.postSaga(this.saga).subscribe(
      resp => {
        if (resp !== undefined && resp != null) {
          this.snackBar.open('Saga added successful', 'Close', { duration: 5000, panelClass: 'snackbar'});
          this.addSagaForm.reset();
        }
      }, err => {
        this.snackBar.open('Username or password invalid', 'Close', { duration: 5000, panelClass: 'snackbar'});
      }
    );
  }
}
