import { ListPendingBooksComponent } from './list-pending-books/list-pending-books.component';
import { CreateSpecialAccountComponent } from './create-special-account/create-special-account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AddPendingBookComponent } from './add-pending-book/add-pending-book.component';


const routes: Routes = [
  { path: 'menu', component: AdminHomeComponent },
  { path: 'register', component: CreateSpecialAccountComponent },
  { path: 'stats', component: StatisticsComponent },
  { path: 'pending-books', component: ListPendingBooksComponent },
  { path: 'pending-book/:id', component: AddPendingBookComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
