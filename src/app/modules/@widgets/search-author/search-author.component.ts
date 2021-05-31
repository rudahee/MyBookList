import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IAuthorSimple } from 'app/interfaces/IUser';
import { UserService } from 'app/services/user/user.service';


@Component({
  selector: 'app-search-author',
  templateUrl: './search-author.component.html',
  styleUrls: ['./search-author.component.scss']
})
export class SearchAuthorComponent implements OnInit {

  authorControl = new FormControl();
  options: IAuthorSimple[];

  filteredOptions: Observable<IAuthorSimple[]>;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

    // tslint:disable-next-line: deprecation
    this.userService.getAllAuthors().subscribe(
      res => {

        this.options = [];

        for (const authorComplete of res) {
          const authorSimple: IAuthorSimple = {
            id: authorComplete.id,
            completeName: authorComplete.name + ' ' + authorComplete.surname
          };

          this.options.push(authorSimple);
        }

        this.filteredOptions = this.authorControl.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.options.slice())
          );
      });
  }

  displayFn(book: IAuthorSimple): string {
    return book && book.completeName ? book.completeName : '';
  }

  public _filter(value: string): IAuthorSimple[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => {
      return option.completeName.toLowerCase().indexOf(filterValue) === 0;
    });
  }
}
