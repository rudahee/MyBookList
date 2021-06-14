import { WidgetEmitterService } from './../../../services/widget-emitter/widget-emitter.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IAuthorSimple } from 'app/interfaces/IUser';
import { UserService } from 'app/services/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-select-author',
  templateUrl: './select-author.component.html',
  styleUrls: ['./select-author.component.scss']
})
export class SelectAuthorComponent implements OnInit {

  authorControl = new FormControl();
  options: IAuthorSimple[];
  selectedAuthors: IAuthorSimple[] = [];

  filteredOptions: Observable<IAuthorSimple[]>;

  constructor(private userService: UserService, private widgetService: WidgetEmitterService, private snackBar: MatSnackBar) { }

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

  selectAuthorFromInput(): void {

    this.selectAuthor(this.authorControl.value);
  }

  selectAuthor(event: MatAutocompleteSelectedEvent): void {

    if (this.selectedAuthors.findIndex(author => author.completeName === event.option.value.completeName) >= 0
        || this.options.findIndex(author => author.completeName === event.option.value.completeName) === -1) {

          this.snackBar.open('The selected author is invalid.', 'Close', { duration: 1500, panelClass: 'snackbar' });
          this.authorControl.setValue('');
          return;
    }

    this.selectedAuthors.push(event.option.value);
    this.authorControl.setValue('');
    this.widgetService.setAuthorSelected(this.selectedAuthors);
  }


  removeAuthor(index: number): void {
    this.selectedAuthors.splice(index, 1);
    this.widgetService.setAuthorSelected(this.selectedAuthors);
  }


  displayFn(author: IAuthorSimple): string {
    return author && author.completeName ? author.completeName : '';
  }

  public _filter(value: string): IAuthorSimple[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => {
      return option.completeName.toLowerCase().indexOf(filterValue) === 0;
    });
  }
}
