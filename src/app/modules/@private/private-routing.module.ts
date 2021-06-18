import { AddSagaComponent } from './add-saga/add-saga.component';
import { SagaListComponent } from './saga-list/saga-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AddMultipleBooksComponent } from './add-multiple-books/add-multiple-books.component';
import { IsUserGuard } from 'app/services/guard/user-guard/user.guard';
import { IsAuthorGuard } from 'app/services/guard/author-guard/author.guard';
import { IsAdminGuard } from 'app/services/guard/admin-guard/admin.guard';


const routes: Routes = [
  { path: 'author', loadChildren: () => import('./@author/author.module').then(m => m.AuthorModule), canActivate: [IsAuthorGuard]},
  { path: 'admin', loadChildren: () => import('./@admin/admin.module').then(m => m.AdminModule), canActivate: [IsAdminGuard]},
  { path: '', loadChildren: () => import('./@user/user.module').then(m => m.UserModule), canActivate: [IsUserGuard]},

  { path: 'author/add-books', component: AddMultipleBooksComponent, canActivate: [IsAuthorGuard] },
  { path: 'author/add-book', component: AddBookComponent, canActivate: [IsAuthorGuard] },
  { path: 'author/add-saga', component: AddSagaComponent, canActivate: [IsAuthorGuard] },
  { path: 'author/list-saga', component: SagaListComponent, canActivate: [IsAuthorGuard] },

  { path: 'admin/add-books', component: AddMultipleBooksComponent, canActivate: [IsAdminGuard] },
  { path: 'admin/add-book', component: AddBookComponent, canActivate: [IsAdminGuard] },
  { path: 'admin/add-saga', component: AddSagaComponent, canActivate: [IsAdminGuard] },
  { path: 'admin/list-saga', component: SagaListComponent, canActivate: [IsAdminGuard] }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
