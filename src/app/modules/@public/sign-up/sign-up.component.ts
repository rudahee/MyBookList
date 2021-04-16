import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {


  signUpForm: FormGroup;

  constructor(private build: FormBuilder) { }

  ngOnInit(): void {
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
    console.log("do nothing")
  }
}
