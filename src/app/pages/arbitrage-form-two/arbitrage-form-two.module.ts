import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArbitrageFormTwoComponent } from './arbitrage-form-two.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

export const routes = [
  { path: '', component: ArbitrageFormTwoComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [ArbitrageFormTwoComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class ArbitrageFormTwoModule { }
