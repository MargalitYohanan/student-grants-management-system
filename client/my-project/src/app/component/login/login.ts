import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../service/auth'; // ייבוא של סרוויס האימות שאת בנית

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  readonly form = this.fb.nonNullable.group({
    userId: ['', Validators.required],
    password: ['', Validators.required]
  });

  submit(): void {
    // אם הטופס לא תקין (למשל אחד השדות ריק), נסמן את השדות כנגועים ונעצור
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.login(this.form.getRawValue()).subscribe({
      next: (res) => {
        alert('התחברת בהצלחה!');
        
        // ניתוב דינמי: אם המשתמש הוא מנהל, נעביר אותו לעמוד הניהול, אחרת לעמוד הבית
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin/requests']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        alert('שגיאה בהתחברות: ' + (err?.error?.message || 'נסו שוב'));
      }
    });
  }
}