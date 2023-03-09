import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: 'user/login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [RouterModule],
})
export class LoginModule {}
