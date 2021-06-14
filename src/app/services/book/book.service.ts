import { IBook, IBookForApproval, IBookToPublicList, ISaga, IGenre, IComment } from './../../interfaces/IBook';
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

  public getAllBooksPending(): Observable<IBookForApproval[]> {
    return this.httpC.get<IBookForApproval[]>('/book/approval/all');
  }

  public getBookPending(id: string): Observable<IBookForApproval> {
    return this.httpC.get<IBookForApproval>('/book/approval/' + id);
  }

  public deleteBooksPending(id: string): Observable<IBookForApproval> {
    return this.httpC.delete<IBookForApproval>('/book/approval/' + id);
  }

  public getComments(id: string): Observable<IComment[]> {
    return this.httpC.get<IComment[]>('/book/comments/' + id);
  }

  public getBookStatus(idBook: string): Observable<IBookToPublicList> {
    return this.httpC.get<IBookToPublicList>('/book/user/status/' + idBook);
  }

  public getBookFromSagaByBookIs(id: string): Observable<IBook[]> {
    return this.httpC.get<IBook[]>('/saga/book/' + id);
  }

  public getAllSagas(): Observable<ISaga[]> {
    return this.httpC.get<ISaga[]>('/saga/all');
  }

  public getSagaFromAuthor(id: string): Observable<ISaga[]> {
    return this.httpC.get<ISaga[]>('/saga/author/' + id);
  }

  public removeSaga(id: string): Observable<any> {
    return this.httpC.delete('/saga/' + id);
  }

  public getAuthorsFromBook(idAuthor: string): Observable<IAuthorSimple[]> {
    return this.httpC.get<IAuthorSimple[]>('/book/authors/' + idAuthor);
  }

  public postSaga(saga: ISaga): Observable<ISaga> {
    return this.httpC.post<ISaga>('/saga', saga);
  }

  public postBooks(books: IBook[], sagaId: string, authorsId: number[]): Observable<IBook[]> {
    let requestParams = '';

    for (const index in authorsId) {
      if (index === '0') {
        requestParams = requestParams + '?authorsId=' + authorsId[index];
      } else{
        requestParams = requestParams + '&authorsId=' + authorsId[index];
      }
    }

    if (sagaId === undefined) {
      return this.httpC.post<IBook[]>('/book/all/-1' + requestParams, books);
    } else {
      return this.httpC.post<IBook[]>('/book/all/' + sagaId + requestParams, books);
    }
  }

  public postBook(book: IBook, sagaId: string, authorsId: number[] ): Observable<IBook> {
    let requestParams = '';

    console.log(book, sagaId, authorsId)
    for (const index in authorsId) {
      if (index === '0') {
        requestParams = requestParams + '?authorsId=' + authorsId[index];
      } else{
        requestParams = requestParams + '&authorsId=' + authorsId[index];
      }
    }

    if (sagaId === undefined) {
      return this.httpC.post<IBook>('/book/-1' + requestParams, book);
    } else {
      return this.httpC.post<IBook>('/book/' + sagaId + requestParams, book);
    }
  }

  public postBookForApproval(book: IBookForApproval): Observable<IBookForApproval> {
    return this.httpC.post<IBookForApproval>('/book/approval', book);
  }

  public addBookToList(data: any): Observable<any> {
    return this.httpC.put<any>('/book/add/list', data);
  }

  public updateStatusFromBook(data: any): Observable<any> {
    return this.httpC.put<any>('/book/update/list', data);
  }

  public getMeanScoreFromBook(id: string): Observable<any> {
    return this.httpC.get<any>('/book/mean-score/' + id);
  }

  public getBooksToPublicList(id: string): Observable<IBookToPublicList[]> {
    return this.httpC.get<IBookToPublicList[]>('/book/user/' + id + '/list');
  }

  public getAllGenres(): Observable<IGenre[]> {
    return this.httpC.get<IGenre[]>('/book/genres/all');
  }

}
