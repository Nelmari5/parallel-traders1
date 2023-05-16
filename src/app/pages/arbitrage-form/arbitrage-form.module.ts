import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArbitrageFormComponent } from './arbitrage-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { FormlyFieldStepper } from './stepper.type';

export const routes = [
  { path: '', component: ArbitrageFormComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    FormlyBootstrapModule,
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
      types: [
        { name: 'stepper', component: FormlyFieldStepper, wrappers: ['form-field'] },
      ],
    }),
  ],
  declarations: [
    ArbitrageFormComponent,
    FormlyFieldStepper,
  ],
})

export class ArbitrageFormModule { }