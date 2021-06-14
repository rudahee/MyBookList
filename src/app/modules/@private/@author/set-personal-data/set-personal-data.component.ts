import { IPublicAuthor } from 'app/interfaces/IUser';
import { UserService } from 'app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-set-personal-data',
  templateUrl: './set-personal-data.component.html',
  styleUrls: ['./set-personal-data.component.scss']
})
export class SetPersonalDataComponent implements OnInit {

  authorPublic: IPublicAuthor;
  biographyControl = new FormControl();
  urlImageControl = new FormControl();
  urlImage: string;
  isSelectedNewImage = false;

  constructor(private userService: UserService, private snackBar: MatSnackBar, private location: Location) { }

  ngOnInit(): void {
    this.userService.getPublicAuthorInfo(localStorage.getItem('user_id')).subscribe(
      res => {
        if (res.roles[0] !== 'AUTHOR') {
          this.snackBar.open('Invalid author page', 'Close', { duration: 5000, panelClass: 'snackbar'});
          this.location.back();
        } else {
          this.authorPublic = res;

          if (this.authorPublic.urlImage) {
            this.urlImageControl.setValue(this.authorPublic.urlImage);
          }

          if (this.authorPublic.biography) {
            this.biographyControl.setValue(this.authorPublic.biography);
          }
        }
      }, err => {
        if (err.error) {
          this.snackBar.open(err.error.message, 'Close', { duration: 5000, panelClass: 'snackbar'});
        } else {
          this.snackBar.open('Can not get data from author. Try it later', 'Close', { duration: 5000, panelClass: 'snackbar'});
        }
      }
    );
  }

  updateImage(): void {
    this.urlImage = this.urlImageControl.value;
    this.isSelectedNewImage = true;
  }

  removeImage(): void {
    this.urlImageControl.reset();
    this.urlImage = undefined;
    this.isSelectedNewImage = false;
  }

  sendPersonalInfo(): void {
    this.userService.sendPersonalDataAuthor(this.urlImageControl.value, this.biographyControl.value).subscribe(
      res => {
        this.snackBar.open('Data successfully changed', 'Close', { duration: 5000, panelClass: 'snackbar'});
        this.location.back();
      }
    );
  }
}
