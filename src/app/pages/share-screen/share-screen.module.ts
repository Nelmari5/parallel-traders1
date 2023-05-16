import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShareScreenComponent } from './share-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxPayPalModule } from 'ngx-paypal';
export const routes = [
  { path: '', component: ShareScreenComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [ShareScreenComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    NgxPayPalModule,
    RouterModule.forChild(routes),
  ]
})
export class ShareScreenModule { }
