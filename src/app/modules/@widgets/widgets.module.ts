import { RouterModule } from '@angular/router';
import { SelectGenreComponent } from './select-genre/select-genre.component';
import { SearchAuthorComponent } from './search-author/search-author.component';
import { MatTableModule } from '@angular/material/table';
import { TableBookListComponent } from './table-book-list/table-book-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetsComponent } from './widgets.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { SelectAuthorComponent } from './select-author/select-author.component';
import { SearchBookComponent } from './search-book/search-book.component';
import { SelectSagaComponent } from './select-saga/select-saga.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NgxStarsModule } from 'ngx-stars';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    NgxStarsModule,
    RouterModule
  ],
  declarations: [
    WidgetsComponent,
    SelectAuthorComponent,
    SearchBookComponent,
    SelectSagaComponent,
    SearchAuthorComponent,
    TableBookListComponent,
    SelectGenreComponent
  ],
  exports: [
    SelectAuthorComponent,
    SearchBookComponent,
    SelectSagaComponent,
    SearchAuthorComponent,
    TableBookListComponent,
    SelectGenreComponent
  ]
})
export class WidgetsModule { }
