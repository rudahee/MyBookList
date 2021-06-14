import { WidgetsModule } from './../../@widgets/widgets.module';
import { SelectAuthorComponent } from './../../@widgets/select-author/select-author.component';
import { SelectGenreComponent } from './../../@widgets/select-genre/select-genre.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddPendingBookComponent } from './add-pending-book/add-pending-book.component';
import { ListPendingBooksComponent } from './list-pending-books/list-pending-books.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSpecialAccountComponent } from './create-special-account/create-special-account.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatSelectModule } from '@angular/material/select';
import { StatisticsComponent } from '../@admin/statistics/statistics.component';
import { SelectSagaComponent } from 'app/modules/@widgets/select-saga/select-saga.component';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    WidgetsModule
  ],
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    CreateSpecialAccountComponent,
    StatisticsComponent,
    ListPendingBooksComponent,
    AddPendingBookComponent,
  ]
})
export class AdminModule { }
