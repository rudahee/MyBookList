import { UserService } from 'app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { IUser } from 'app/interfaces/IUser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-special-account',
  templateUrl: './create-special-account.component.html',
  styleUrls: ['./create-special-account.component.scss']
})
export class CreateSpecialAccountComponent implements OnInit {

  constructor(private build: FormBuilder, private userService: UserService, private snackbar: MatSnackBar) { }

  signUpForm: FormGroup;

  ngOnInit(): void {
    this.signUpForm = this.build.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(14), Validators.max(90)]],
      gender: [''],
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      enable_account: [''],
      type_account: ['']
    });
  }

  submitAccount(): void {
    const user: IUser = {
      age: this.signUpForm.controls.age.value,
      email: this.signUpForm.controls.email.value,
      name: this.signUpForm.controls.name.value,
      surname: this.signUpForm.controls.surname.value,
      username: this.generateUsername(),
      enableAccount: this.signUpForm.controls.enable_account.value,
      createTime: null,
      lastPasswordChange: null,
      password: null,
      roles: null,
      updateTime: null,
    };

    const isAdmin: string = this.signUpForm.controls.type_account.value as string;

    if (isAdmin === 'true'){
      // admin

      this.userService.signUpAdmin(user).subscribe(
        () => {
          this.snackbar.open('Successfully Admin Added', 'Close', { duration: 5000, panelClass: 'snackbar'});
          this.signUpForm.reset();
        }

      // tslint:disable-next-line: no-unused-expression
      ), err => {
        if (err.error) {
          this.snackbar.open(err.error.message, 'Close', { duration: 5000, panelClass: 'snackbar'});
        } else {
          this.snackbar.open('Indeterminate error', 'Close', { duration: 5000, panelClass: 'snackbar'});
        }
      };
    } else if (isAdmin === 'false') {
      // author

      this.userService.signUpAuthor(user).subscribe(
        () => {
          this.snackbar.open('Successfully Author Added', 'Close', { duration: 5000, panelClass: 'snackbar'});
          this.signUpForm.reset();
        }
      // tslint:disable-next-line: no-unused-expression
      ), err => {
        if (err.error) {
          this.snackbar.open(err.error.message, 'Close', { duration: 5000, panelClass: 'snackbar'});
        } else {
          this.snackbar.open('Indeterminate error', 'Close', { duration: 5000, panelClass: 'snackbar'});
        }
      };
    }
  }

  private generateUsername(): string {
    let username: string = this.signUpForm.controls.name.value.substr(0, 3) + '.' + this.signUpForm.controls.surname.value.substr(0, 3);

    username = username + Math.round(Math.random() * 1000);
    return username;
  }
}
