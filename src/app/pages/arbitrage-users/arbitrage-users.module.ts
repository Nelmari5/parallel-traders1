import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArbitrageUsersComponent } from './arbitrage-users.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export const routes = [
  { path: '', component: ArbitrageUsersComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [ArbitrageUsersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class ArbitrageUsersModule { }
