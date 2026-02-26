import { Component, inject } from '@angular/core';
import {  FormBuilder,  FormsModule,  ReactiveFormsModule,  Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule,ReactiveFormsModule, RouterLink,],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder);
  authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    age: [0, [Validators.required, Validators.min(18)]],
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*\d)[A-Za-z\d]{8,}$/),
      ],
    ],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern(/^\+9955\d{8}$/)]],
    zipcode: ['', [Validators.required, Validators.pattern(/^\d/)]],
    avatar: ['', [Validators.required]],
    gender: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.registerForm.invalid) return;

    const data = {
      firstName: this.registerForm.get('firstName')?.value || '',
      lastName: this.registerForm.get('lastName')?.value || '',
      age: Number(this.registerForm.get('age')?.value || 0),
      email: this.registerForm.get('email')?.value || '',
      password: this.registerForm.get('password')?.value || '',
      address: this.registerForm.get('address')?.value || '',
      phone: this.registerForm.get('phone')?.value || '',
      zipcode: this.registerForm.get('zipcode')?.value || '',
      avatar: this.registerForm.get('avatar')?.value || '',
      gender: (this.registerForm.get('gender')?.value || '') as 'MALE' | 'FEMALE',
    };

    this.authService.register(data).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('error:', err);
      },
    });
  }
}
