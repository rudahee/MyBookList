import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/services/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from './../../../interfaces/IUser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public-user',
  templateUrl: './public-user.component.html',
  styleUrls: ['./public-user.component.scss']
})
export class PublicUserComponent implements OnInit {

  public publicUserId: string;
  public user: IUser;

  /**
   * Creates an instance of PublicUserComponent.
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @param {UserService} userService
   * @param {MatSnackBar} snackBar
   * @param {Location} location
   * @memberof PublicUserComponent
   * 
   * @author J. Rubén Daza
   */
  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
              private snackBar: MatSnackBar, private location: Location) { }


  /**
   * Initialize data to show a public user
   *
   * @memberof PublicUserComponent
   * 
   * @author J. Rubén Daza
   */
  ngOnInit(): void {
    this.publicUserId = this.route.snapshot.paramMap.get('id');

    if (this.publicUserId === localStorage.getItem('user_id')) {
      this.router.navigate(['/me'])
    }

    this.userService.getPublicUserInfo(this.publicUserId).subscribe(
      res => {
        if (res.roles[0] !== 'USER') {
          this.snackBar.open('Invalid user page', 'Close', { duration: 5000, panelClass: 'snackbar'});
          this.location.back();
        }

        this.user = res;
      },
      err => {
        if (err.error) {
          this.snackBar.open(err.error.message, 'Close', { duration: 5000, panelClass: 'snackbar'});
        } else {
          this.snackBar.open('Can not get data from user. Try it later', 'Close', { duration: 5000, panelClass: 'snackbar'});
        }
      }
    );
  }

  public sendFriendRequest(): void {
    this.userService.friendshipRequest(this.publicUserId).subscribe(
      () => {
        this.snackBar.open('Successful request send', 'Close', { duration: 5000, panelClass: 'snackbar'});
      },
      err =>{
        if (err.error) {
          this.snackBar.open(err.error.message, 'Close', { duration: 5000, panelClass: 'snackbar'});
        } else {
          this.snackBar.open('Indeterminate Error', 'Close', { duration: 5000, panelClass: 'snackbar'});
        }
      }
    )
  }

}
