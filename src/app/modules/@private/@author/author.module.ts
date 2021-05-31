import { MatButtonModule } from '@angular/material/button';
import { AuthorHomeComponent } from './author-home/author-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author.component';
import { AuthorRoutingModule } from './author-routing.module';
import { AuthorPublicComponent } from './author-public/author-public.component';

@NgModule({
  imports: [
    CommonModule,
    AuthorRoutingModule,
    MatButtonModule
  ],
  declarations: [
    AuthorComponent,
    AuthorPublicComponent,
    AuthorHomeComponent
  ]
})
export class AuthorModule { }
