import { IBookToPublicList } from './../../../interfaces/IBook';
import { Component, AfterViewInit } from '@angular/core';
import { IBook } from 'app/interfaces/IBook';
import { BookService } from 'app/services/book/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-book-list',
  templateUrl: './user-book-list.component.html',
  styleUrls: ['./user-book-list.component.scss']
})
export class UserBookListComponent implements AfterViewInit {

  bookListComplete: IBookToPublicList[];

  listCompleted: IBookToPublicList[] = [];
  listDropped: IBookToPublicList[] = [];
  listOnHold: IBookToPublicList[] = [];
  listPlanToRead: IBookToPublicList[] = [];
  listReading: IBookToPublicList[] = [];

  listCompletedDisplayedColumns: string[] = [];
  listDroppedDisplayedColumns: string[] = [];
  listOnHoldDisplayedColumns: string[] = [];
  listPlanToReadDisplayedColumns: string[] = [];
  listReadingDisplayedColumns: string[] = [];

  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.bookService.getBooksToPublicList(id).subscribe(
      res => {
        this.bookListComplete = res;
        this.separateFullListByStatus();
        this.generateDisplayedColumnsToTable();
      });
    }


    private separateFullListByStatus(): void {
      this.listDropped = this.bookListComplete.filter(book => book.status === 'DROPPED');
      this.listCompleted = this.bookListComplete.filter(book => book.status === 'COMPLETED');
      this.listOnHold = this.bookListComplete.filter(book => book.status === 'ONHOLD');
      this.listPlanToRead = this.bookListComplete.filter(book => book.status === 'PLANTOREAD');
      this.listReading = this.bookListComplete.filter(book => book.status === 'READING');
    }

    private generateDisplayedColumnsToTable(): void {
      this.listCompletedDisplayedColumns = ['imageUrl', 'name', 'comment', 'score', 'action'];
      this.listDroppedDisplayedColumns = ['imageUrl', 'name', 'comment', 'score', 'action'];
      this.listOnHoldDisplayedColumns = ['imageUrl', 'name', 'comment', 'pages readed', 'score', 'action'];
      this.listPlanToReadDisplayedColumns = ['imageUrl', 'name', 'action'];
      this.listReadingDisplayedColumns = ['imageUrl', 'name', 'comment', 'pages readed', 'action'];
    }
}
