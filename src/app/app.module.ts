import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { PublicModule } from './modules/@public/public.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



const matModules = [MatExpansionModule, MatIconModule, MatCardModule, MatButtonModule, MatToolbarModule ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    PublicModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    matModules,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
