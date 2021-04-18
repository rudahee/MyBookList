import { FinishSignUpComponent } from './finish-sign-up/finish-sign-up.component';
import { BookListComponent } from './book-list/book-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { BookComponent } from './book/book.component';

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-up-finished', component: FinishSignUpComponent },
  { path: 'activate-account/:id/:token', component: ActivateAccountComponent },
  { path: 'activate-account', component: ActivateAccountComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'book', component: BookComponent },
  { path: 'book-list', component: BookListComponent },
  { path: '', component: HomePageComponent }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
