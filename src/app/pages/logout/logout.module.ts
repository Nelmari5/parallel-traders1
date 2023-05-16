import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LogoutComponent } from './logout.component';
import { HttpClientModule } from '@angular/common/http';

export const routes = [
  { path: '', component: LogoutComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule, 
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [
    LogoutComponent
  ]
})
export class LogoutModule { }