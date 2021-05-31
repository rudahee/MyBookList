import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IBook } from 'app/interfaces/IBook';
import { BookService } from 'app/services/book/book.service';


@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.scss']
})
export class SearchBookComponent implements OnInit {

  options: IBook[];
  bookControl = new FormControl();
  filteredOptions: Observable<IBook[]>;

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {

    // tslint:disable-next-line: deprecation
    this.bookService.getAllBooks().subscribe(
    res => {
      this.options = res;

      this.filteredOptions = this.bookControl.valueChanges.pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.name),
          map(name => name ? this._filter(name) : this.options.slice())
        );
  });

}

  displayFn(book: IBook): string {
    return book && book.name ? book.name : '';
  }

  public _filter(value: string): IBook[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
