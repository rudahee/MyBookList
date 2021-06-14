import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { StatisticsComponent } from './statistics/statistics.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthorHomeComponent } from './author-home/author-home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorComponent } from './author.component';
import { AuthorRoutingModule } from './author-routing.module';
import { SetPersonalDataComponent } from './set-personal-data/set-personal-data.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthorRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  declarations: [
    AuthorComponent,
    AuthorHomeComponent,
    StatisticsComponent,
    SetPersonalDataComponent
  ]
})
export class AuthorModule { }
