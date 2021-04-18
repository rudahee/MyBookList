import { IUser } from 'src/app/interfaces/IUser';
import { UserService } from 'src/app/services/user/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-private',
  templateUrl: './user-private.component.html',
  styleUrls: ['./user-private.component.scss']
})
export class UserPrivateComponent implements OnInit {

  constructor(private userService: UserService) { }
  user: IUser;

  ngOnInit(): void {
    this.userService.getPrivateUserInfo().subscribe(
      res => {
        this.user = res;
      }
    );
  }

}
