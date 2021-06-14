import { IStatisticsAdmin } from './../../../../interfaces/IStatistics';
import { StatisticsService } from './../../../../services/statistics/statistics.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

  stats: IStatisticsAdmin;

  constructor(private statsService: StatisticsService) { }

  ngOnInit(): void {
    this.statsService.getAdminStatistics().subscribe(
      res => {
        this.stats = res;
      }
    );

  }

}
