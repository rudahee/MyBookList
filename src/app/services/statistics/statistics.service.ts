import { IStatisticsUser, IStatisticsAdmin, IStatisticsAuthor } from './../../interfaces/IStatistics';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private httpC: HttpClient) { }

  getUserStatistics(id: string): Observable<IStatisticsUser> {
    return this.httpC.get<IStatisticsUser>('/statistics/user/' + id);
  }

  getAdminStatistics(): Observable<IStatisticsAdmin> {
    return this.httpC.get<IStatisticsAdmin>('/statistics/admin');
  }

  getAuthorStatistics(id: string): Observable<IStatisticsAuthor> {
    return this.httpC.get<IStatisticsAuthor>('/statistics/author/' + id);
  }
}
