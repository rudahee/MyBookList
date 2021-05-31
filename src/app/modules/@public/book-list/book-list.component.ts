import { Router } from '@angular/router';
import { BookService } from './../../../services/book/book.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IBook } from 'app/interfaces/IBook';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  public ELEMENT_DATA: IBook[];
  displayedColumns: string[] = ['imageUrl', 'name', 'description', 'action-list', 'action-see'];
  dataSource: MatTableDataSource<IBook>;
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
    this.id = localStorage.getItem('user_id');
    this.innerWidth = window.innerWidth;
    this.dataSource = new MatTableDataSource<IBook>();
    
    if (this.id == undefined) {
      this.displayedColumns.splice(3, 1);
    }
    
    // tslint:disable-next-line: deprecation
    this.bookService.getAllBooks().subscribe(
      res => {
        this.ELEMENT_DATA = res;
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
        this.resultsLength = this.ELEMENT_DATA.length;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(event: Event): void {
    console.log((event.target as HTMLInputElement).value)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event): void {
    this.innerWidth = window.innerWidth;
  }

}
