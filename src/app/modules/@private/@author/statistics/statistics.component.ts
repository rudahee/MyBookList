import { Component, OnInit } from '@angular/core';
import { IStatisticsAdmin, IStatisticsAuthor } from 'app/interfaces/IStatistics';
import { StatisticsService } from 'app/services/statistics/statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  stats: IStatisticsAuthor;

  constructor(private statsService: StatisticsService) { }
  
  /**
   * Get data from service.
   *
   * @memberof StatisticsComponent
   * 
   * @author J. Rubén Daza
   */
  ngOnInit(): void {
    this.statsService.getAuthorStatistics(localStorage.getItem('user_id')).subscribe(
      res => {
        this.stats = res;
      }
    );

  }

}
