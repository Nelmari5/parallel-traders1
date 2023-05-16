import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArbitrageComponent } from './arbitrage.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

export const routes = [
  { path: '', component: ArbitrageComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [ArbitrageComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    ChartsModule
  ]
})
export class ArbitrageModule { }
