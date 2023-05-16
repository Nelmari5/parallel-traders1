import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaypalAmountComponent } from './paypal-amount.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPayPalModule } from 'ngx-paypal';
export const routes = [
  { path: '', component: PaypalAmountComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [PaypalAmountComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPayPalModule,
    RouterModule.forChild(routes),
  ]
})
export class PaypalAmountModule { }
