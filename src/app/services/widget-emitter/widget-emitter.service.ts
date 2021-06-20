import { ISaga } from 'app/interfaces/IBook';
import { IGenre } from './../../interfaces/IBook';
import { IAuthorSimple } from './../../interfaces/IUser';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WidgetEmitterService {

  constructor() { }

  authorsSelected: IAuthorSimple[];
  genresSelected: IGenre[];
  sagaSelected: ISaga;

  @Output()
  authorsEmitter = new EventEmitter<IAuthorSimple[]>();
  @Output()
  genresEmitter = new EventEmitter<IGenre[]>();
  @Output()
  sagaEmitter = new EventEmitter<ISaga>();

  /*
  * Emit changes in author
  */
  private emitAuthors(): void {
    this.authorsEmitter.emit(this.authorsSelected);
  }

  public setAuthorSelected(authorsSelected: IAuthorSimple[]): void {
    this.authorsSelected = authorsSelected;
    this.emitAuthors();
  }

  /*
  * Emit changes in genres
  */
  public setGenresSelected(genresSelected: IGenre[]): void {
    this.genresSelected = genresSelected;
    this.emitGenres();
  }

  private emitGenres(): void {
    this.genresEmitter.emit(this.genresSelected);
  }

  /*
  * Emit changes in saga
  */
  public setSagaSelected(sagaSelected: ISaga): void {
    this.sagaSelected = sagaSelected;
    this.emitSaga();
  }

  private emitSaga(): void {
    this.sagaEmitter.emit(this.sagaSelected);
  }
}
