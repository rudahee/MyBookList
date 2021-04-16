import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  constructor(private route: ActivatedRoute, private build: FormBuilder) { }

  id: string;
  token: string;
  activateAccountForm: FormGroup;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.token = this.route.snapshot.paramMap.get('token');

    if ((this.id !== '' && this.id !== undefined) && (this.token !== '' && this.token !== undefined)) {
      console.log(this.id + ' ' + this.token);
    }

    this.activateAccountForm = this.build.group({
      token: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('[A-Za-z0-9]+/+\\d')]]
    });
  }


  activateAccount(): void {
    const tokenForm: string = this.activateAccountForm.controls.token.value;
    console.log(tokenForm.substring(0, 8) + ' ' + tokenForm.substring(9, 10));
  }
}
