import { UserBookListComponent } from './user-book-list/user-book-list.component';
import { PublicAuthorComponent } from './public-author/public-author.component';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
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
import { HomePageComponent } from './home-page/home-page.component';
import { BookComponent } from './book/book.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { WidgetsModule } from '../@widgets/widgets.module';
import { PublicUserComponent } from './public-user/public-user.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxStarsModule } from 'ngx-stars';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PublicRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    WidgetsModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    CarouselModule,
    NgxStarsModule,
    MatTabsModule
  ],
  declarations: [
    PublicComponent,
    ActivateAccountComponent,
    SignUpComponent,
    FinishSignUpComponent,
    BookListComponent,
    SignInComponent,
    HomePageComponent,
    BookComponent,
    PublicUserComponent,
    PublicAuthorComponent,
    UserBookListComponent
  ]
})
export class PublicModule { }
