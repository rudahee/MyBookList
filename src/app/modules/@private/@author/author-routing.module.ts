import { StatisticsComponent } from './statistics/statistics.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorHomeComponent } from './author-home/author-home.component';
import { SetPersonalDataComponent } from './set-personal-data/set-personal-data.component';


const routes: Routes = [
  { path: 'menu', component: AuthorHomeComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'personal/data', component: SetPersonalDataComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
