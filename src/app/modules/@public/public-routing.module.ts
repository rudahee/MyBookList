import { UserBookListComponent } from './user-book-list/user-book-list.component';
import { FinishSignUpComponent } from './finish-sign-up/finish-sign-up.component';
import { BookListComponent } from './book-list/book-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { BookComponent } from './book/book.component';
import { PublicUserComponent } from './public-user/public-user.component';
import { PublicAuthorComponent } from './public-author/public-author.component';
import { IsLoggedGuard } from 'app/services/guard/logged-guard/logged.guard';

const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent, canActivate: [IsLoggedGuard]},
  { path: 'sign-up-complete', component: FinishSignUpComponent, canActivate: [IsLoggedGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [IsLoggedGuard] },
  { path: 'activate-account/:id/:token', component: ActivateAccountComponent, canActivate: [IsLoggedGuard] },
  { path: 'activate-account', component: ActivateAccountComponent, canActivate: [IsLoggedGuard] },
  { path: 'book/:id', component: BookComponent },
  { path: 'book-list', component: BookListComponent },
  { path: 'user/:id', component: PublicUserComponent },
  { path: 'author/page/:id', component: PublicAuthorComponent },
  { path: '', component: HomePageComponent },
  { path: 'user/:id/list', component: UserBookListComponent}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
