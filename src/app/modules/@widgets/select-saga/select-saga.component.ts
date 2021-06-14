import { WidgetEmitterService } from './../../../services/widget-emitter/widget-emitter.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ISaga } from 'app/interfaces/IBook';
import { BookService } from 'app/services/book/book.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-select-saga',
  templateUrl: './select-saga.component.html',
  styleUrls: ['./select-saga.component.scss']
})
export class SelectSagaComponent implements OnInit {

  sagaControl = new FormControl();
  filteredOptions: Observable<ISaga[]>;
  selectedSaga: ISaga;
  options: ISaga[];

  constructor(private bookService: BookService, private router: Router, private widgetService: WidgetEmitterService) { }

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

  selectSaga(event: MatAutocompleteSelectedEvent): void {

    this.selectedSaga = event.option.value;

    this.widgetService.setSagaSelected(this.selectedSaga);
  }

  removeSaga(): void {
    this.sagaControl.setValue('');
    this.widgetService.setSagaSelected(undefined);
  }

  displayFn(saga: ISaga): string {
    return saga && saga.name ? saga.name : '';
  }

  public _filter(value: string): ISaga[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

}
