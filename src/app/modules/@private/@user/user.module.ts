import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBookPendingComponent } from './add-book-pending/add-book-pending.component';
import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UserComponent } from './user/user.component';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { AddBookToListComponent } from './add-book-to-list/add-book-to-list.component';
import { NgxStarsModule } from 'ngx-stars';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    ClipboardModule,
    MatFormFieldModule,
    NgxStarsModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [
  ],
  declarations: [
    UserComponent,
    AddBookPendingComponent,
    AddBookToListComponent
  ]
})
export class UserModule { }
