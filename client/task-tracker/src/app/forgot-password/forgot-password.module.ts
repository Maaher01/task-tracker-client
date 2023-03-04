import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password.component';

import { MatFormFieldModule } from '@angular/material/form-field';

const routes: Routes = [
  {
    path: 'user/forgotpassword',
    component: ForgotPasswordComponent,
  },
];

@NgModule({
  declarations: [ForgotPasswordComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
})
export class ForgotPasswordModule {}
