import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SagaListComponent } from './saga-list/saga-list.component';
import { AddSagaComponent } from './add-saga/add-saga.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AdminModule } from './@admin/admin.module';
import { AuthorModule } from './@author/author.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrivateRoutingModule } from './private-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateComponent } from './private.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { WidgetsModule } from '../@widgets/widgets.module';
import { AddBookComponent } from './add-book/add-book.component';
import { AddMultipleBooksComponent } from './add-multiple-books/add-multiple-books.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  imports: [
    CommonModule,
    PrivateRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxDropzoneModule,
    AuthorModule,
    AdminModule,
    WidgetsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule
  ],
  declarations: [
    PrivateComponent,
    AddBookComponent,
    AddMultipleBooksComponent,
    AddSagaComponent,
    SagaListComponent,
  ]
})
export class PrivateModule { }
