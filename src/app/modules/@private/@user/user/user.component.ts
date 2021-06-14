import { StatisticsService } from './../../../../services/statistics/statistics.service';
import { IStatisticsUser } from './../../../../interfaces/IStatistics';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IFriendRequest, IUser, IAuthorSimple } from 'app/interfaces/IUser';
import { UserService } from 'app/services/user/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements AfterViewInit {

  constructor(private userService: UserService, private snackbar: MatSnackBar, private statisticsService: StatisticsService) { }

  friendRequests: IFriendRequest[] = [];
  friends: IFriendRequest[] = [];
  authors: IAuthorSimple[] = [];

  userStats: IStatisticsUser;

  user: IUser = {
    id: 0,
    name: '',
    surname: '',
    age: 0,
    username: '',
    password: '',
    email: '',
    roles: '',
    createTime: undefined,
    updateTime: undefined,
    lastPasswordChange: undefined
  };

  ngAfterViewInit(): void {
    // tslint:disable-next-line: deprecation
    this.userService.getPrivateUserInfo().subscribe(
      res => {
        this.user = res;
      }
    );

    this.statisticsService.getUserStatistics(localStorage.getItem('user_id')).subscribe(
      res => {
        this.userStats = res;
      }
    );

    this.getAuthors();
    this.getFriends();
  }

  getFriends(): void {
    this.friendRequests = [];
    this.friends = [];

    this.userService.getFriendships().subscribe(
      res => {
        res.forEach(
          friend => {
            if (!friend.accepted) {
              this.friendRequests.push(friend);
            } else {
              this.friends.push(friend);
            }
          });
      }
    );
  }

  getAuthors(): void {
    this.userService.getFollowedAuthor().subscribe(
      res => {
        this.authors = res;
      }
    );
  }

  showSnackBarLinkCopied(): void {
    this.snackbar.open('Link copied!', 'Close', { duration: 1000, panelClass: 'snackbar'});
  }

  acceptFriendRequest(id: string): void {
    this.userService.acceptFriendship(id).subscribe(
      () => {
        this.snackbar.open('Succesfully Accepted', 'Close', { duration: 2000, panelClass: 'snackbar'});
        this.getFriends();
      },
      () => {
        this.snackbar.open('Unexpected error. Try it later', 'Close', { duration: 2000, panelClass: 'snackbar'});
      }
    );
  }

  rejectFriendRequest(id: string): void {
    this.userService.rejectFriendship(id).subscribe(
      () => {
        this.snackbar.open('Succesfully Accepted', 'Close', { duration: 2000, panelClass: 'snackbar'});
        this.getFriends();
      },
      () => {
        this.snackbar.open('Unexpected error. Try it later', 'Close', { duration: 2000, panelClass: 'snackbar'});
      }
    );
  }
}
