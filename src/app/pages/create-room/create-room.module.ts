import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRoomComponent } from './create-room.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// FormsModule
export const routes = [
  { path: '', component: CreateRoomComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [CreateRoomComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ]
})
export class CreateRoomModule { }
