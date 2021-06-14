import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IBookForApproval } from 'app/interfaces/IBook';
import { BookService } from 'app/services/book/book.service';

@Component({
  selector: 'app-list-pending-books',
  templateUrl: './list-pending-books.component.html',
  styleUrls: ['./list-pending-books.component.scss']
})
export class ListPendingBooksComponent implements OnInit {

  public ELEMENT_DATA: IBookForApproval[];
  displayedColumns: string[] = ['imageUrl', 'name', 'notes', 'action-see'];
  dataSource: MatTableDataSource<IBookForApproval>;
  paginator;
  resultsLength: number;
  public innerWidth: any;
  public id: string;


  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
  }
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit(): void {

    if (window.innerWidth < 700) {
      this.displayedColumns.splice(1, 1);
    }

    this.id = localStorage.getItem('user_id');
    this.innerWidth = window.innerWidth;
    this.dataSource = new MatTableDataSource<IBookForApproval>();

    // tslint:disable-next-line: triple-equals
    if (this.id == undefined) {
      this.displayedColumns.splice(3, 1);
    }

    // tslint:disable-next-line: deprecation
    this.bookService.getAllBooksPending().subscribe(
      res => {
        console.log(res);
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.resultsLength = this.ELEMENT_DATA.length;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
