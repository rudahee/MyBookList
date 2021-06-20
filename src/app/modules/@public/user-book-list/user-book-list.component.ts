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


  // All list its for call a widget with table. we need a list for each type of table.
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

  /**
   * Creates an instance of UserBookListComponent.
   * @param {BookService} bookService
   * @param {ActivatedRoute} route
   * @memberof UserBookListComponent
   * 
   * @author J. Rubén Daza
   */
  constructor(private bookService: BookService, private route: ActivatedRoute) { }

  /**
   * Retrieve data from backend.
   *
   * @memberof UserBookListComponent
   */
  ngAfterViewInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.bookService.getBooksToPublicList(id).subscribe(
      res => {
        this.bookListComplete = res;
        this.separateFullListByStatus();
        this.generateDisplayedColumnsToTable();
      });
    }

  /**
   * Filter data by status in each list
   *
   * @private
   * @memberof UserBookListComponent
   * 
   * @author J. Rubén Daza
   */
  private separateFullListByStatus(): void {
    this.listDropped = this.bookListComplete.filter(book => book.status === 'DROPPED');
    this.listCompleted = this.bookListComplete.filter(book => book.status === 'COMPLETED');
    this.listOnHold = this.bookListComplete.filter(book => book.status === 'ONHOLD');
    this.listPlanToRead = this.bookListComplete.filter(book => book.status === 'PLANTOREAD');
    this.listReading = this.bookListComplete.filter(book => book.status === 'READING');
  }

  /**
   * Generate display cols by status. In order: Dropped, Completed, On Hold, Plan To Read and Reading
   *
   * @private
   * @memberof UserBookListComponent
   * 
   * @author J. Rubén Daza
   */
  private generateDisplayedColumnsToTable(): void {
    this.listCompletedDisplayedColumns = ['imageUrl', 'name', 'comment', 'score', 'action'];
    this.listDroppedDisplayedColumns = ['imageUrl', 'name', 'comment', 'score', 'action'];
    this.listOnHoldDisplayedColumns = ['imageUrl', 'name', 'comment', 'pages readed', 'score', 'action'];
    this.listPlanToReadDisplayedColumns = ['imageUrl', 'name', 'action'];
    this.listReadingDisplayedColumns = ['imageUrl', 'name', 'comment', 'pages readed', 'action'];
  }
}
