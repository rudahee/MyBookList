import { AddBookToListComponent } from './add-book-to-list/add-book-to-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookPendingComponent } from './add-book-pending/add-book-pending.component';
import { UserComponent } from './user/user.component';
import { ChangeBookStatusComponent } from './change-book-status/change-book-status.component';


const routes: Routes = [
  { path: 'me', component: UserComponent },
  { path: 'add-book', component: AddBookPendingComponent },
  { path: 'add-book-list/:id', component: AddBookToListComponent },
  { path: 'update-book-status/:id', component: ChangeBookStatusComponent }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
