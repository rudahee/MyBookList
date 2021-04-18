import { Router, RouterModule } from '@angular/router';
import { UserService } from './../../../services/user/user.service';
import { ILoginData } from './../../../interfaces/IUser';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JwtHandlerService } from 'src/app/services/jwt-token/jwt-handler.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  loginData: ILoginData;

  constructor(private build: FormBuilder, private userService: UserService, private JWTHandler: JwtHandlerService,
              private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.build.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  signIn(): void {
    this.loginData = this.signInForm.value;

    this.userService.signIn(this.loginData).subscribe(
      resp => {
        if (resp !== undefined && resp != null) {
          this.JWTHandler.saveJWT(resp.headers.get('Authorization').split(' ')[1].trim());
          this.router.navigate(['/book']);
        }
    });
  }
}
