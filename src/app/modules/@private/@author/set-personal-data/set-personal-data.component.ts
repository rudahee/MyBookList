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

  /**
   * Creates an instance of SetPersonalDataComponent.
   * @param {UserService} userService
   * @param {MatSnackBar} snackBar
   * @param {Location} location
   * @memberof SetPersonalDataComponent
   * 
   * @author J. Rubén Daza
   */
  constructor(private userService: UserService, private snackBar: MatSnackBar, private location: Location) { }

  /**
   * Initialize form, and other data.
   *
   * @memberof SetPersonalDataComponent
   * 
   * @author J. Rubén Daza
   */
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

  /**
   * This method is needed to control image visualization.
   *
   * @memberof SetPersonalDataComponent
   * 
   * @author J. Rubén Daza
   */
  updateImage(): void {
    this.urlImage = this.urlImageControl.value;
    this.isSelectedNewImage = true;
  }

  /**
   * This method is needed to control image visualization.
   *
   * @memberof SetPersonalDataComponent
   * 
   * @author J. Rubén Daza
   */
  removeImage(): void {
    this.urlImageControl.reset();
    this.urlImage = undefined;
    this.isSelectedNewImage = false;
  }

  /**
   * Send data from form to service.
   *
   * @memberof SetPersonalDataComponent
   * 
   * @author J. Rubén Daza
   */
  sendPersonalInfo(): void {
    this.userService.sendPersonalDataAuthor(this.urlImageControl.value, this.biographyControl.value).subscribe(
      res => {
        this.snackBar.open('Data successfully changed', 'Close', { duration: 5000, panelClass: 'snackbar'});
        this.location.back();
      }
    );
  }
}
