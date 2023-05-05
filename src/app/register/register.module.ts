import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

import { MaterialModule } from '../material.module';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'user/signup',
    component: RegisterComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [RouterModule],
})
export class RegisterModule {}
