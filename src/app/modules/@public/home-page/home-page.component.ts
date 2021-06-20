import { UserService } from 'app/services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { IRecommendation } from 'app/interfaces/IRecommendation';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  customOptions: OwlOptions = {
    autoWidth: true,
    autoHeight: false,
    autoplay: true,
    autoplaySpeed: 4000,
    autoplayTimeout: 4000,
    dots: true,
    dotsEach: 3,
    loop: true,
    margin: 2,
    center: true,
    navSpeed: 1200,
    lazyLoadEager: 2,
    items: 5,
  };

  public recommendations: IRecommendation[];

  /**
   * Creates an instance of HomePageComponent.
   * @param {UserService} userService
   * @memberof HomePageComponent
   *
   * @author J. Rubén Daza
   */
  constructor(private userService: UserService) { }

  /**
   * If you are logged and you are a USER, get recommendations.
   *
   * @memberof HomePageComponent
   *
   * @author J. Rubén Daza
   */
  ngOnInit(): void {

    if (localStorage.getItem('roles') === 'USER') {
      this.userService.getRecommendations().subscribe(
        res => {
          this.recommendations = res;

          console.log(this.recommendations);
        }
      );
    }
  }

}
