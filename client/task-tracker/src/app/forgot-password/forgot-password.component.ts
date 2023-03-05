import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent {
  public errorResponse!: string;
  public successResponse!: string;

  resetPasswordForm = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(11),
    ]),
  });

  constructor(private fb: FormBuilder, private router: Router) {}
}
