import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyDashboardComponent } from './my-dashboard.component';
import { RouterModule } from '@angular/router';
export const routes = [
  { path: '', component: MyDashboardComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [MyDashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class MyDashboardModule { }
