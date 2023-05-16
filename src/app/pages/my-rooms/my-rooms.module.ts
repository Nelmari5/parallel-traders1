import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRoomsComponent } from './my-rooms.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
// FormsModule
// FormsModule
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FormsModule } from '@angular/forms';


const config: SocketIoConfig = { url: 'https://parallel-traders.herokuapp.com', options: {} };
export const routes = [
  { path: '', component: MyRoomsComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [MyRoomsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    RouterModule.forChild(routes),
    SocketIoModule.forRoot(config),
  ]
})
export class MyRoomsModule { }
