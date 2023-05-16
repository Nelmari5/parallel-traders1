import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import { RouterModule } from '@angular/router';

export const routes = [
  { path: '', component: ExploreComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [ExploreComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ExploreModule { }
