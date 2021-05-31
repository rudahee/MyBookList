import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSpecialAccountComponent } from './create-special-account/create-special-account.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { NgxDropzoneModule } from 'ngx-dropzone';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule
  ],
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    CreateSpecialAccountComponent,
  ]
})
export class AdminModule { }
