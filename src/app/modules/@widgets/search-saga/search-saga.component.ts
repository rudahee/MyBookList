import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ISaga } from 'app/interfaces/IBook';
import { BookService } from 'app/services/book/book.service';

@Component({
  selector: 'app-search-saga',
  templateUrl: './search-saga.component.html',
  styleUrls: ['./search-saga.component.scss']
})
export class SearchSagaComponent implements OnInit {

  sagaControl = new FormControl();
  filteredOptions: Observable<ISaga[]>;
  options: ISaga[];

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    // tslint:disable-next-line: deprecation
    this.bookService.getAllSagas().subscribe(
      res => {
        this.options = res;

        this.filteredOptions = this.sagaControl.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.options.slice())
          );
    });

  }

  displayFn(saga: ISaga): string {
    return saga && saga.name ? saga.name : '';
  }

  public _filter(value: string): ISaga[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
