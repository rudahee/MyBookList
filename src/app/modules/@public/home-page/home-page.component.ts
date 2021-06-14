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

  constructor(private userService: UserService) { }

  ngOnInit(): void {

    this.userService.getRecommendations().subscribe(
      res => {
        this.recommendations = res;

        console.log(this.recommendations);
      }
    );
  }

}
