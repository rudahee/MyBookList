import { IBook, IBookForApproval, IBookToPublicList, ISaga } from './../../interfaces/IBook';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAuthorSimple } from 'app/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpC: HttpClient) { }

  public getBook(id: string): Observable<IBook> {
    return this.httpC.get<IBook>('/book/' + id);
  }

  public getAllBooks(): Observable<IBook[]> {
    return this.httpC.get<IBook[]>('/book/all');
  }

  public getBookFromSagaByBookIs(id: string): Observable<IBook[]> {
    return this.httpC.get<IBook[]>('/saga/book/' + id);
  }

  public getAllSagas(): Observable<ISaga[]> {
    return this.httpC.get<ISaga[]>('/saga/all');
  }

  public getAuthorsFromBook(idAuthor: string): Observable<IAuthorSimple[]> {
    return this.httpC.get<IAuthorSimple[]>('/book/authors/' + idAuthor);
  }

  public postBooks(books: IBook[], authorId: string, sagaId?: string): Observable<IBook[]> {
    return this.httpC.post<IBook[]>('/book/all/' + authorId + '?sagaId=' + sagaId, books);
  }

  public postBook(book: IBook): Observable<IBook> {
    return this.httpC.post<IBook>('/book', book);
  }

  public postBookForApproval(book: IBookForApproval): Observable<IBookForApproval> {
    return this.httpC.post<IBookForApproval>('/book/approval', book);
  }

  public addBookToList(data: any): Observable<any> {
    return this.httpC.put<any>('/book/add/list', data);
  }

  public getMeanScoreFromBook(id: string): Observable<any> {
    return this.httpC.get<any>('/book/mean-score/' + id);
  }

  public getBooksToPublicList(id: string): Observable<IBookToPublicList[]> {
    return this.httpC.get<IBookToPublicList[]>('/book/user/' + id + '/list');
  }
}
