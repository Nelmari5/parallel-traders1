import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddMembersComponent } from './add-members.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
export const routes = [
  { path: '', component: AddMembersComponent, pathMatch: 'full' }
];



@NgModule({
  declarations: [AddMembersComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule
  ]
})
export class AddMembersModule { }
