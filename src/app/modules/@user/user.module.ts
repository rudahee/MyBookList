import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userComponent } from './user.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  providers: [],
  declarations: [userComponent]
})
export class userModule { }
