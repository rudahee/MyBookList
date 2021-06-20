import { IComment } from './../../../interfaces/IBook';
import { startWith } from 'rxjs/operators';
import { UserService } from 'app/services/user/user.service';
import { IAuthorSimple } from 'app/interfaces/IUser';
import { IBook } from 'app/interfaces/IBook';
import { BookService } from './../../../services/book/book.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ThemePalette } from '@angular/material/core';
import { NgxStarsComponent } from 'ngx-stars';
import { MatPaginator } from '@angular/material/paginator';

type Rating = {
  value: number;
  max: number;
  color?: ThemePalette;
  disabled?: boolean;
  dense?: boolean;
  readonly?: boolean;
};

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  public hidden = true;
  public book: IBook;
  public authors: IAuthorSimple[] = [];
  public slidesForSaga: any = [];

  public pageComment = 1;

  @ViewChild(NgxStarsComponent)
  starsComponent: NgxStarsComponent;

  public score = 0;

  comments: IComment[];

  public customOptions: OwlOptions = {
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
    items: 1,
  };


  public synopsis: string[] = [];

  /**
   * Creates an instance of BookComponent.
   * @param {ActivatedRoute} router
   * @param {BookService} bookService
   * @param {Router} route
   * @memberof BookComponent
   * 
   * @author J. Rubén Daza
   */
  constructor(private router: ActivatedRoute, private bookService: BookService,
              private route: Router) { }

  /**
   * Retrieve data for back and initialize all necessary data.
   *
   * @memberof BookComponent
   * 
   * @author J. Rubén Daza
   */
  ngOnInit(): void {
    let id: string;

    // Re-charge compononent when you call this component from itself
    this.route.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
    
    this.router.params.subscribe(params => {
      id = params.id;
    });

    this.bookService.getMeanScoreFromBook(id).subscribe(
      res => {

        if (res.score !== undefined && !isNaN(res.score) && res.score !== null) {
          this.score = res.score;
        } else {
          this.score = 0;
        }
      }
    );

    this.bookService.getComments(id).subscribe(
      res => {
        this.comments = res;
      }
    );


    this.bookService.getBookFromSagaByBookIs(id).subscribe(
      res => {
        // tslint:disable-next-line: forin
        for (const i in res) {
          const slide: any = {
            id: i,
            img: res[i].imageUrl,
            idBook: res[i].id
          };
          this.slidesForSaga.push(slide);
        }
      }
    );

    this.bookService.getAuthorsFromBook(id).subscribe(
      res => {
        this.authors = res;
      }
    );

    // tslint:disable-next-line: deprecation
    this.bookService.getBook(id).subscribe(
      res => {
        this.book = res;

        if (this.book.description.length < 750) {
          this.synopsis.push(this.book.description);
        } else {
          const index = this.book.description.indexOf(' ', 500);
          this.synopsis.push(this.book.description.substring(0, index));
          this.synopsis.push(this.book.description.substring(index + 1));
        }
      }
    );
  }

  /**
   * Go to view details of a book.
   *
   * @param {string} id
   * @memberof BookComponent
   * 
   * @author J. Rubén Daza
   */
  navigateToBook(id: string): void {
    this.route.navigate(['/book/', id]);
  }

}
