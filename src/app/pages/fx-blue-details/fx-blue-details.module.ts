import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FxBlueDetailsComponent } from './fx-blue-details.component';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
export const routes = [
  { path: '', component: FxBlueDetailsComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [FxBlueDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    NgxMatSelectSearchModule
  ]
})
export class FxBlueDetailsModule { }
