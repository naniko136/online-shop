import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-log-in',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './log-in.html',
  styleUrl: './log-in.scss',
})
export class LogIn {
  public authservice = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  logInForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  onSubmit() {
    if (this.logInForm.invalid) return;

    const data = {
      email: this.logInForm.get('email')?.value || '',
      password: this.logInForm.get('password')?.value || '',
    };

    this.authservice.signIn(data).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('error:', err);
      },
    });
  }
}
