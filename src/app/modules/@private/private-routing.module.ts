import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { AddMultipleBooksComponent } from './add-multiple-books/add-multiple-books.component';


const routes: Routes = [
  { path: 'author', loadChildren: () => import('./@author/author.module').then(m => m.AuthorModule)},
  { path: 'admin', loadChildren: () => import('./@admin/admin.module').then(m => m.AdminModule)},
  { path: '', loadChildren: () => import('./@user/user.module').then(m => m.UserModule)},
  { path: 'author/add-books', component: AddMultipleBooksComponent },
  { path: 'author/add-book', component: AddBookComponent },

  { path: 'admin/add-books', component: AddMultipleBooksComponent },
  { path: 'admin/add-book', component: AddBookComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
