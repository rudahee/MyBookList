import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { IBook } from 'src/app/interfaces/IBook';

const ELEMENT_DATA: IBook[] = [
  {position: 1, name: 'Hydrogen', publisher: 'Hydrogen', isbn: 'H'},
  {position: 2, name: 'Helium', publisher: 'Hydrogen', isbn: 'He'},
  {position: 3, name: 'Lithium', publisher: 'Hydrogen', isbn: 'Li'},
  {position: 4, name: 'Beryllium', publisher: 'Hydrogen', isbn: 'Be'},
  {position: 5, name: 'Boron', publisher: 'Hydrogen', isbn: 'B'},
  {position: 6, name: 'Carbon', publisher: 'Hydrogen', isbn: 'C'},
  {position: 7, name: 'Nitrogen', publisher: 'Hydrogen', isbn: 'N'},
  {position: 8, name: 'Oxygen', publisher: 'Hydrogen', isbn: 'O'},
  {position: 9, name: 'Fluorine', publisher: 'Hydrogen', isbn: 'F'},
  {position: 10, name: 'Neon', publisher: 'Hydrogen', isbn: 'Ne'},
];

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent {

  constructor() { }

  displayedColumns: string[] = ['position', 'name', 'publisher', 'isbn'];
  public dataSource = ELEMENT_DATA;

}
