import { WidgetEmitterService } from './../../../services/widget-emitter/widget-emitter.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { xml2json } from 'xml-js';
import { load as yaml2json } from 'js-yaml';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IBook } from 'app/interfaces/IBook';
import { BookService } from 'app/services/book/book.service';
import { JwtHandlerService } from 'app/services/jwt-token/jwt-handler.service';

@Component({
  selector: 'app-add-multiple-books',
  templateUrl: './add-multiple-books.component.html',
  styleUrls: ['./add-multiple-books.component.scss']
})
export class AddMultipleBooksComponent implements OnInit {

  authorId: string;

  constructor(private bookService: BookService, private jwtTokenHandler: JwtHandlerService,
              private router: Router, private snackbar: MatSnackBar, private widgetService: WidgetEmitterService) { }

  public title = 'dropzone';

  files: File[] = [];

  books: IBook[] = [];

  ngOnInit(): void {

    const route = this.router.url;

    if (route.includes('author')) {
      this.authorId = this.jwtTokenHandler.getUID();
    } else {
      this.authorId = undefined;
    }
  }



  public onSelect(event: any): void {
      this.files.push(...event.addedFiles);
  }


  public UploadFiles(): void {
    let isValid = true;

    this.files.forEach(
      file => {
        const extension = this.getExtension(file.name);
        if (extension != null) {

          if (extension === '.json') {
            this.formatFromJSON(file);
          } else if (extension === '.xml') {
            this.formatFromXML(file);
          } else if (extension === '.yaml') {
            this.formatFromYAML(file);
          } else {
            isValid = false;
            this.snackbar.open('ERROR: ' + extension + ' is invalid, please user .json, .xml or .yaml extensions', 'Close',
                                { duration: 5000, panelClass: 'snackbar'});
          }
          this.files = [];
          this.books = [];
        }
    });

    if (isValid) {
      this.snackbar.open('Uploading...', 'Close', { duration: 2000, panelClass: 'snackbar'});

      // tslint:disable-next-line: deprecation
      setTimeout(() => {

        if (!this.widgetService.authorsSelected) {
          this.snackbar.open('You need to add at least one author!', 'Close', { duration: 5000, panelClass: 'snackbar'});
          return;
        }

        if (!this.widgetService.genresSelected) {
          this.snackbar.open('You need to add at least one genre!', 'Close', { duration: 5000, panelClass: 'snackbar'});
          return;
        }

        this.books.forEach(b => {
          b.genres = this.widgetService.genresSelected;
        });

        const authorsId = this.widgetService.authorsSelected.map(author => author.id);
        this.bookService.postBooks(
          this.books,
          (this.widgetService.sagaSelected) ? this.widgetService.sagaSelected.id.toString() : undefined,
          authorsId).subscribe(
        res => {
          this.books = [];
          this.files = [];
          this.snackbar.open('Successfully Added', 'Close', { duration: 5000, panelClass: 'snackbar'});
        }, err => {
          console.log(err);
          if (err.error !== undefined && err.error !== null) {
            this.snackbar.open(err.error.message, 'Close', { duration: 5000, panelClass: 'snackbar'});
          } else {
            this.snackbar.open('Unexpected error', 'Close', { duration: 5000, panelClass: 'snackbar'});
          }
        });
      }, 1000);

    }else {
      this.snackbar.open('Something Failed. Try it later...', 'Close', { duration: 2000, panelClass: 'snackbar'});

    }
  }

  public onRemove(event: any): void {

      this.files.splice(this.files.indexOf(event), 1);
  }

  private formatFromJSON(jsonFile: File): void {
    jsonFile.text().then(
      res => {
        const newBooks: IBook[] = JSON.parse(res);
        this.books = this.books.concat(newBooks);
    });
  }

  private formatFromXML(xmlFile: File): void {

    const options = {
      compact: true,
      trim: true,
      ignoreDeclaration: true,
      ignoreInstruction: true,
      ignoreAttributes: true,
      ignoreComment: true,
      ignoreCdata: true,
      ignoreDoctype: true,
      nativeType: true,
      textFn: this.removeJsonTextAttribute
    };

    xmlFile.text().then(
      res => {
        const newBooks: IBook[] = [];
        const json = JSON.parse(xml2json(res, options));

        json.root.element.forEach(
          book => {
            book.pages = book.pages._text as number;
            newBooks.push(book as IBook);
        });

        this.books = this.books.concat(newBooks);
    });
  }

  private formatFromYAML(yamlFile: File): void {
    yamlFile.text().then(
      res => {
        this.books = this.books.concat(yaml2json(res) as IBook[]);
    });
  }

  private getExtension(name: string): string {
    const lastDot = name.lastIndexOf('.');

    if (lastDot === -1) {
      return null;

    } else {
      return name.substring(lastDot);
    }
  }


  private removeJsonTextAttribute = (value: any, parentElement: any) => {
    try {
      // Array of keys
      const pOpKeys = Object.keys(parentElement._parent);
      const arrOfKey = parentElement._parent[pOpKeys[pOpKeys.length - 1]];

      // Quantity of keys
      const arrOfKeyLen = arrOfKey.length;

      // Natives values are asigned
      if (arrOfKeyLen > 0) {

        const arr = arrOfKey;
        const arrIndex = arrOfKey.length - 1;
        arr[arrIndex] = value;

      } else {

        parentElement._parent[pOpKeys[pOpKeys.length - 1]] = value;
      }

    } catch (e) {}
  }

}


