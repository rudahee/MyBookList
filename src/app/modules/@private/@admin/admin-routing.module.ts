import { CreateSpecialAccountComponent } from './create-special-account/create-special-account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AddBookComponent } from '../add-book/add-book.component';
import { AddMultipleBooksComponent } from '../add-multiple-books/add-multiple-books.component';


const routes: Routes = [
  { path: 'menu', component: AdminHomeComponent },
  { path: 'register', component: CreateSpecialAccountComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
