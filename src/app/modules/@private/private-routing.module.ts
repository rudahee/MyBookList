import { AddSagaComponent } from './add-saga/add-saga.component';
import { SagaListComponent } from './saga-list/saga-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AddMultipleBooksComponent } from './add-multiple-books/add-multiple-books.component';
import { IsUserGuard } from 'app/services/guard/user-guard/user.guard';


const routes: Routes = [
  { path: 'author', loadChildren: () => import('./@author/author.module').then(m => m.AuthorModule)},
  { path: 'admin', loadChildren: () => import('./@admin/admin.module').then(m => m.AdminModule)},
  { path: '', loadChildren: () => import('./@user/user.module').then(m => m.UserModule), canActivate: [IsUserGuard]},
  { path: 'author/add-books', component: AddMultipleBooksComponent },
  { path: 'author/add-book', component: AddBookComponent },

  { path: 'author/add-saga', component: AddSagaComponent },
  { path: 'author/list-saga', component: SagaListComponent },

  { path: 'admin/add-books', component: AddMultipleBooksComponent },
  { path: 'admin/add-book', component: AddBookComponent },

  { path: 'admin/add-saga', component: AddSagaComponent },
  { path: 'admin/list-saga', component: SagaListComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
