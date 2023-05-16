import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Charts2Component } from './charts2.component';
import { RouterModule } from '@angular/router';
export const routes = [
  { path: '', component: Charts2Component, pathMatch: 'full' }
];


@NgModule({
  declarations: [Charts2Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class Charts2Module { }
