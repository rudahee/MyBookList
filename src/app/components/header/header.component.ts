import { JwtHandlerService } from './../../services/jwt-token/jwt-handler.service';
import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public sideNav: boolean;

  public id: string;
  public role: string;

  constructor(private location: Location, private jwtService: JwtHandlerService) {
    this.sideNav = false;
    this.id = localStorage.getItem('user_id');
    this.role = localStorage.getItem('roles');
   }

  navigateBack(): void {
    this.location.back();
  }

  public signOut(): void {
    this.jwtService.deleteJWT();
  }


}
