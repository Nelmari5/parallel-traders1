import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SignUpComponent } from './sign-up.component';
import { HttpClientModule } from '@angular/common/http';
export const routes = [
  { path: '', component: SignUpComponent, pathMatch: 'full' }
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
    SignUpComponent
  ]
})
export class SignUpModule { }