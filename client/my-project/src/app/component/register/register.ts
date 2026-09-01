import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../service/auth'; // נתיב לסרוויס שלך

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  // שימוש ב-nonNullable מבטיח ל-TypeScript שהערכים הם string נקי ולא null
  readonly form = this.fb.nonNullable.group({
    userId: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.register(this.form.getRawValue()).subscribe({
      next: (response) => {
        alert('נרשמת בהצלחה!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('שגיאה בהרשמה: ' + (err?.error?.message || 'נסו שוב'));
      }
    });
  }
}