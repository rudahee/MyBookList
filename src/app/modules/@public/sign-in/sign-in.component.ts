import { Router, RouterModule } from '@angular/router';
import { UserService } from './../../../services/user/user.service';
import { ILoginData } from './../../../interfaces/IUser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHandlerService } from 'app/services/jwt-token/jwt-handler.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  visibilityPassword = false;

  loginData: ILoginData;

  constructor(private build: FormBuilder, private userService: UserService, private JWTHandler: JwtHandlerService,
              private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signInForm = this.build.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  signIn(): void {
    this.loginData = this.signInForm.value;

    // tslint:disable-next-line: deprecation
    this.userService.signIn(this.loginData).subscribe(
      resp => {
        if (resp !== undefined && resp != null) {
          this.snackBar.open('Sign In successful', 'Close', { duration: 5000, panelClass: 'snackbar'});
          this.JWTHandler.saveJWT(resp.headers.get('Authorization').split(' ')[1].trim());
          this.router.navigate(['/']);
        }
      }, err => {
        this.snackBar.open('Username or password invalid', 'Close', { duration: 5000, panelClass: 'snackbar'});
      }
    );
  }
}
