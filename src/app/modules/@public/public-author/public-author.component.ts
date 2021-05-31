import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IPublicAuthor } from 'app/interfaces/IUser';
import { UserService } from 'app/services/user/user.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location } from '@angular/common';
declare var $: any;
@Component({
  selector: 'app-public-author',
  templateUrl: './public-author.component.html',
  styleUrls: ['./public-author.component.scss']
})
export class PublicAuthorComponent implements OnInit {
  public publicAuthorId: string;
  public authorPublic: IPublicAuthor;

  public slides: any = [];

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


  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
              private snackBar: MatSnackBar, private location: Location) { }

  ngOnInit(): void {
    this.publicAuthorId = this.route.snapshot.paramMap.get('id');

    this.userService.getPublicAuthorInfo(this.publicAuthorId).subscribe(
      res => {
        if (res.roles[0] !== 'AUTHOR') {
          this.snackBar.open('Invalid author page', 'Close', { duration: 5000, panelClass: 'snackbar'});
          this.location.back();
        } else {
          this.authorPublic = res;

          if (this.authorPublic.books.length > 0) {
            // tslint:disable-next-line: forin
            for (const i in this.authorPublic.books) {
              const slide: any = {
                id: i,
                img: this.authorPublic.books[i].imageUrl,
                idBook: this.authorPublic.books[i].id
              };
              this.slides.push(slide);
            }
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

  followAuthor(): void {
    this.userService.followAuthor(this.publicAuthorId).subscribe(
      () => {
        this.snackBar.open('Author successfully followed', 'Close', { duration: 5000, panelClass: 'snackbar'});
      }, err => {
        this.snackBar.open(err.error.message, 'Close', { duration: 5000, panelClass: 'snackbar'});
      }
    );
  }

}
