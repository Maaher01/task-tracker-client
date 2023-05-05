import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  public errorResponse!: string;

  registerForm = this.fb.group({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(128),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(128),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(11),
    ]),
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  registerUser() {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.registerForm.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorResponse = err.message;
      },
    });
  }
}
