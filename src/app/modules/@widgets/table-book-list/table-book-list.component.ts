import { IBookToPublicList } from './../../../interfaces/IBook';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-table-book-list',
  templateUrl: './table-book-list.component.html',
  styleUrls: ['./table-book-list.component.scss']
})
export class TableBookListComponent implements OnInit {

  constructor() { }

  @Input()
  displayedColumns: string[];

  @Input()
  bookList: IBookToPublicList[];

  public ELEMENT_DATA: IBookToPublicList[];
  dataSource: MatTableDataSource<IBookToPublicList>;
  paginator;
  resultsLength: number;
  public innerWidth: any;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
  }
  @ViewChild(MatSort) sort: MatSort = new MatSort();


  ngOnInit(): void {

    this.innerWidth = window.innerWidth;

    if (this.innerWidth < 650) {
      this.displayedColumns.splice(1, 1);
      if (this.displayedColumns.indexOf('comment') !== -1) {
        this.displayedColumns.splice(this.displayedColumns.indexOf('comment') , 1);
      }
    }

    this.dataSource = new MatTableDataSource<IBookToPublicList>();
    // tslint:disable-next-line: deprecation

    this.ELEMENT_DATA = this.bookList;

    console.log(this.bookList)
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    this.resultsLength = this.ELEMENT_DATA.length;
    this.dataSource.sort = this.sort;
  }


  getPercentage(pagesReaded: number, totalPages: number): string {
    const percentage = pagesReaded / totalPages * 100;

    const percentageWithOneDecimal = Math.round(percentage * 10) / 10;

    return ' (' + percentageWithOneDecimal + '%)';

  }

}
