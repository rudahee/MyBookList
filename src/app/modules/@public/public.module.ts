import { BookListComponent } from './book-list/book-list.component';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicComponent } from './public.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { FinishSignUpComponent } from './finish-sign-up/finish-sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PublicRoutingModule } from './public-routing.module';





@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    MatTableModule
  ],
  declarations: [
    PublicComponent,
    ActivateAccountComponent,
    SignUpComponent,
    FinishSignUpComponent,
    BookListComponent,
    SignInComponent
  ]
})
export class PublicModule { }
