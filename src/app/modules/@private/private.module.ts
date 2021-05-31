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
    MatButtonModule
  ],
  declarations: [
    PrivateComponent,
    AddBookComponent,
    AddMultipleBooksComponent
  ]
})
export class PrivateModule { }
