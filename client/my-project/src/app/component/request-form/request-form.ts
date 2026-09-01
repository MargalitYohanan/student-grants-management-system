import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Request } from '../../service/request';

@Component({
  selector: 'app-request-form',
  imports: [ReactiveFormsModule],
  templateUrl: './request-form.html',
  styleUrl: './request-form.css'
})
export class RequestForm {
  private fb = inject(FormBuilder);
  private requestService = inject(Request);
  private router = inject(Router);

  readonly majors = ['מדעי המחשב', 'הנדסה', 'כלכלה', 'פסיכולוגיה'];
  readonly banks = ['לאומי', 'הפועלים', 'מזרחי טפחות', 'דיסקונט', 'בינלאומי'];
  
  readonly form = this.fb.nonNullable.group({

    personalDetails: this.fb.nonNullable.group({
      birthDate: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      mobilePhone: ['', Validators.required],
      homePhone: [''] // שדה רשות (אין Validators.required)
    }),

    familyDetails: this.fb.nonNullable.group({
      father: this.fb.nonNullable.group({
        id: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      }),
      mother: this.fb.nonNullable.group({
        id: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required]
      }),
      siblingsUnder18: [0, [Validators.required, Validators.min(0)]],
      siblingsOver21WithMoreThanOneChild: [0, [Validators.required, Validators.min(0)]]
    }),

    studyDetails: this.fb.nonNullable.group({
      major: ['', Validators.required],
      schoolName: ['', Validators.required],
      yearsOfStudy: [1, [Validators.required, Validators.min(1)]],
      annualTuition: [0, [Validators.required, Validators.min(0)]]
    }),

    bankDetails: this.fb.nonNullable.group({
      ownerId: ['', Validators.required],
      bankName: ['', Validators.required],
      branchNumber: ['', Validators.required],
      accountNumber: ['', Validators.required]
    })
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.requestService.createRequest(this.form.getRawValue() as any).subscribe({
      next: () => {
        alert('הבקשה שלך הוגשה בהצלחה לוועדה!');
        this.router.navigate(['/request/status']);
      },
      error: (err) => {
        alert('שגיאה בהגשת הבקשה: ' + (err?.error?.message || 'אנא נסו שוב'));
      }
    });
  }
}