import { IBook, ISaga } from 'app/interfaces/IBook';
import { ChangeDetectorRef, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BookService } from 'app/services/book/book.service';
import { JwtHandlerService } from 'app/services/jwt-token/jwt-handler.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-saga-list',
  templateUrl: './saga-list.component.html',
  styleUrls: ['./saga-list.component.scss']
})
export class SagaListComponent implements OnInit {

  public ELEMENT_DATA: ISaga[];
  displayedColumns: string[] = ['name', 'action'];
  dataSource: MatTableDataSource<ISaga>;
  paginator;
  resultsLength: number;
  public id: string;

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
  }
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  /**
   * Creates an instance of SagaListComponent.
   * @param {JwtHandlerService} jwtTokenHandler
   * @param {BookService} bookService
   * @param {Router} router
   * @param {MatSnackBar} snackbar
   * @memberof SagaListComponent
   * 
   * @author J. Rubén Daza
   */
  constructor(private jwtTokenHandler: JwtHandlerService, private bookService: BookService,
              private router: Router, private snackbar: MatSnackBar) { }


  /**
   * Initialize all data for table, it requested to backend.
   *
   * @memberof SagaListComponent
   * 
   * @author J. Rubén Daza
   */
  ngOnInit(): void {
    const route = this.router.url;
    this.dataSource = new MatTableDataSource<ISaga>();

    if (route.includes('author')) {
      this.bookService.getSagaFromAuthor(this.jwtTokenHandler.getUID()).subscribe(
        res => {
          this.ELEMENT_DATA = res;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.resultsLength = this.ELEMENT_DATA.length;
          this.dataSource.sort = this.sort;
        }
      );
    } else {
      this.bookService.getAllSagas().subscribe(
        res => {
          this.ELEMENT_DATA = res;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
          this.resultsLength = this.ELEMENT_DATA.length;
          this.dataSource.sort = this.sort;
        }
      );
    }
  }

  /**
   * Apply filters to search from input bar
   *
   * @param {Event} event
   * @memberof SagaListComponent
   * 
   * @author J. Rubén Daza
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Action to saga, you can remove saga 
   *
   * @param {string} id
   * @memberof SagaListComponent
   *
   * @author J. Rubén Daza
   */
  removeSaga(id: string): void {

    this.bookService.removeSaga(id).subscribe(
      () => {
        this.snackbar.open('Remove successful', 'Close', { duration: 5000, panelClass: 'snackbar'});
        const index = this.dataSource.data.indexOf(aux => aux.id === id);

        this.dataSource.data.splice(index, 1);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource._updateChangeSubscription();
    }, () => {
      this.snackbar.open('Unexpected Error. Contact an Administrator', 'Close', { duration: 5000, panelClass: 'snackbar'});
    });
  }
}
