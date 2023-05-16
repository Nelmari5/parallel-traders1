import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinRoomComponent } from './join-room.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
export const routes = [
  { path: '', component: JoinRoomComponent, pathMatch: 'full' }
];



@NgModule({
  declarations: [JoinRoomComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    CarouselModule,
    RouterModule.forChild(routes),
  ]
})
export class JoinRoomModule { }
