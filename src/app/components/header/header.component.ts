import { JwtHandlerService } from './../../services/jwt-token/jwt-handler.service';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public sideNav: boolean; //used to open left sandwich menu.

  public id = '';
  public role = '';

  /**
   * Creates an instance of HeaderComponent.
   *
   * @constructor
   *
   * @param {Location} location
   * @param {JwtHandlerService} jwtService
   * @memberof HeaderComponent
   *
   * @author J. Rubén Daza
   */
  constructor(private location: Location, private jwtService: JwtHandlerService) {
    this.sideNav = false;

    if (localStorage.getItem('user_id')) {
      this.id = localStorage.getItem('user_id');
    }

    if (localStorage.getItem('roles')) {
      this.role = localStorage.getItem('roles');
    }
   }


  /**
   * Allows you to return to the previous location.
   *
   * @memberof HeaderComponent
   *
   * @author J. Rubén Daza
   */
  navigateBack(): void {
    this.location.back();
  }

  /**
   * Allows you to close your session in app
   *
   * @memberof HeaderComponent
   * 
   * @author J. Rubén Daza
   */
  public signOut(): void {
    this.jwtService.deleteJWT();
  }


}
