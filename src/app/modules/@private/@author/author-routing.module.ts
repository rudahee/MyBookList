import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorHomeComponent } from './author-home/author-home.component';


const routes: Routes = [
  { path: 'menu', component: AuthorHomeComponent },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorRoutingModule { }
