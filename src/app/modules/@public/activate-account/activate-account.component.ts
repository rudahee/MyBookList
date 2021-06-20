import { UserService } from 'app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent implements OnInit {

  /**
   * Creates an instance of ActivateAccountComponent.
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @param {FormBuilder} build
   * @param {UserService} userService
   * @param {MatSnackBar} snackBar
   * @memberof ActivateAccountComponent
   * 
   * @author J. Rubén Daza
   */
  constructor(private route: ActivatedRoute, private router: Router, private build: FormBuilder, private userService: UserService,
              private snackBar: MatSnackBar) { }

  id: string;
  token: string;
  activateAccountForm: FormGroup;

  /**
   * Initialize data and form
   *
   * @memberof ActivateAccountComponent
   *
   * @author J. Rubén Daza
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.token = this.route.snapshot.paramMap.get('token');

    if ((this.id !== '' && this.id !== undefined) && (this.token !== '' && this.token !== undefined)) {
      this.userService.activateAccount(this.token, this.id);
    }

    this.activateAccountForm = this.build.group({
      token: ['', [Validators.required, Validators.maxLength(18), Validators.minLength(10), Validators.pattern('[A-Za-z0-9]+/+[0-9]*')]]
    });
  }

  /**
   * Send token to back, it is correct you will be redirect to sign in page, otherwise show error.
   *
   * @memberof ActivateAccountComponent
   */
  activateAccount(): void {
    const tokenForm: string = this.activateAccountForm.controls.token.value;
    // tslint:disable-next-line: deprecation
    this.userService.activateAccount(tokenForm.substring(0, 8), tokenForm.substring(9)).subscribe(
      () => {
        this.snackBar.open('Account activated successfully', 'Close', { duration: 5000, panelClass: 'snackbar'});

        setTimeout(() => {
          this.router.navigate(['/sign-in']);
        }, 1000);

      }, err => {
        this.snackBar.open(err.error.message, 'Close', { duration: 5000, panelClass: 'snackbar'});
      }
    );
  }
}
