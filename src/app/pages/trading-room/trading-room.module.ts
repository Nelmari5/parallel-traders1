import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradingRoomComponent } from './trading-room.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
export const routes = [
  { path: '', component: TradingRoomComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [TradingRoomComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ]
})
export class TradingRoomModule { }
