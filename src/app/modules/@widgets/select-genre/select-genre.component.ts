import { WidgetEmitterService } from './../../../services/widget-emitter/widget-emitter.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IGenre } from './../../../interfaces/IBook';
import { BookService } from './../../../services/book/book.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-select-genre',
  templateUrl: './select-genre.component.html',
  styleUrls: ['./select-genre.component.scss']
})
export class SelectGenreComponent implements OnInit {

  genreControl = new FormControl();
  options: IGenre[];
  selectedGenres = [];

  filteredOptions: Observable<IGenre[]>;

  /**
   * Creates an instance of SelectGenreComponent.
   * @param {BookService} bookService
   * @param {Router} router
   * @param {MatSnackBar} snackBar
   * @param {WidgetEmitterService} widgetService
   * @memberof SelectGenreComponent
   * 
   * @author J. Rubén Daza
   */
  constructor(private  bookService: BookService, private router: Router,
              private snackBar: MatSnackBar, private widgetService: WidgetEmitterService) { }

  /**
   * Initialize data
   *
   * @memberof SelectAuthorComponent
   * 
   * @author J. Rubén Daza
   */
  ngOnInit(): void {
    this.bookService.getAllGenres().subscribe(
      res => {

        this.options = [];

        for (const genreComplete of res) {
          const genreSimple: IGenre = {
            genre: genreComplete.genre
          };

          this.options.push(genreSimple);
        }

        this.filteredOptions = this.genreControl.valueChanges.pipe(
            startWith(''),
            map(value => typeof value === 'string' ? value : value.name),
            map(name => name ? this._filter(name) : this.options.slice())
          );
      });
  }

  /**
   * When you clicked in autocomplete, do a tag with genre
   *
   * @param {MatAutocompleteSelectedEvent} event
   * @return {*}  {void}
   * @memberof SelectAuthorComponent
   * 
   * @author J. Rubén Daza
   */
  selectGenre(genreSelected: string): void {
    const genreInterface: IGenre = {
      genre: genreSelected
    };

    if (this.selectedGenres.findIndex(genre => genre.genre === genreSelected) >= 0
        || this.options.findIndex(genre => genre.genre === genreSelected) === -1) {

          this.snackBar.open('The selected genre is invalid.', 'Close', { duration: 1500, panelClass: 'snackbar' });
          this.genreControl.setValue('');
          return;
    }

    this.selectedGenres.push(genreInterface);
    this.genreControl.setValue('');

    this.widgetService.setGenresSelected(this.selectedGenres);
  }

  removeGenre(index: number): void {
    this.selectedGenres.splice(index, 1);
    this.widgetService.setGenresSelected(this.selectedGenres);
  }

  selectGenreFromInput(): void {

    this.selectGenre(this.genreControl.value);
  }

  displayFn(genre: IGenre): string {
    return genre && genre.genre ? genre.genre : '';
  }

  public _filter(value: string): IGenre[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => {
      return option.genre.toLowerCase().indexOf(filterValue) === 0;
    });
  }
}
