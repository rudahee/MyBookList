import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;

  constructor(private build: FormBuilder) { }

  ngOnInit(): void {
    this.signInForm = this.build.group({
      username: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  signIn(): void {
    console.log("do nothing")
  }
}
