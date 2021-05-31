import { IUser } from './../../../interfaces/IUser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  user: IUser;
  signUpForm: FormGroup;
  visibilityPassword = false;
  visibilityRepeatPassword = false;

  constructor(private build: FormBuilder, private userService: UserService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.signUpForm = this.build.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(14), Validators.max(90)]],
      gender: [''],
      email: ['', [Validators.required, Validators.minLength(4), Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirm_password: ['', [Validators.required, Validators.minLength(4)]]
    }, {validator: this.comparePassword('password', 'confirm_password')});
  }


  private comparePassword(control: string, secondControl: string): any {
    return(formGroup: FormGroup) => {
      const password = formGroup.controls[control];
      const confirmPassword = formGroup.controls[secondControl];

      if ( !password || !confirmPassword ) {
        return null;
      }

      if ( confirmPassword.errors && !confirmPassword.errors.passwordMismatch ) {
        return null;
      }

      if ( password.value !== confirmPassword.value ) {
        confirmPassword.setErrors({passwordMismatch: true});
      } else {
        confirmPassword.setErrors(null);
      }
    };
  }

  signUp(): void {
    this.user = this.signUpForm.value;
    console.log(this.user);
    // tslint:disable-next-line: deprecation
    this.userService.signUp(this.user).subscribe(
      _ => {
        console.log(_);
        this.snackBar.open('Successful registration', 'Close', { duration: 5000, panelClass: 'snackbar'});
        setTimeout(() => {
          this.router.navigate(['/sign-up-complete']);
        }, 500);

      }, err => {
        console.log(err);
        this.snackBar.open(err.error.message, 'Close', { duration: 5000, panelClass: 'snackbar'});
      }
    );
  }
}
