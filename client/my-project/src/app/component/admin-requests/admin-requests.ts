import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Request } from '../../service/request'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-requests',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './admin-requests.html',
  styleUrl: './admin-requests.css'
})
export class AdminRequests implements OnInit {
  private fb = inject(FormBuilder);
  private requestService = inject(Request);

  requests: any[] = [];

  readonly filterForm = this.fb.nonNullable.group({
    userId: [''],
    city: [''],
    minTuition: [''],
    maxTuition: [''],
    minSiblings: [''],
    maxSiblings: [''],
    fromDate: [''],
    toDate: ['']
  });

  ngOnInit(): void {
    this.search(); 
  }

  search(): void {
    const raw = this.filterForm.getRawValue();

    const filters = {
      userId: raw.userId || undefined,
      city: raw.city || undefined,
      minTuition: raw.minTuition ? Number(raw.minTuition) : undefined,
      maxTuition: raw.maxTuition ? Number(raw.maxTuition) : undefined,
      minSiblings: raw.minSiblings ? Number(raw.minSiblings) : undefined,
      maxSiblings: raw.maxSiblings ? Number(raw.maxSiblings) : undefined,
      fromDate: raw.fromDate || undefined,
      toDate: raw.toDate || undefined
    };

    this.requestService.getRequests(filters).subscribe({
      next: (res: any) => {
        this.requests = res; 
      },
      error: (err: any) => {
        alert(err?.error?.message || 'שגיאה בטעינת הבקשות מהשרת');
      }
    });
  }

  //  פונקציה לאיפוס כל הפילטרים שנבחרו
  resetFilters(): void {
    this.filterForm.reset({
      userId: '', city: '', minTuition: '', maxTuition: '',
      minSiblings: '', maxSiblings: '', fromDate: '', toDate: ''
    });
    this.search(); // הרצת חיפוש מחדש כדי להביא שוב את כל הבקשות ללא סינון
  }

  //  פונקציית עזר פשוטה לקביעת מחלקת ה-CSS של הסטטוס (עיצוב צבעוני לפי המצב)
  badgeClass(status: string): string {
    if (status === 'אושר') return 'badge badge--approved';
    if (status === 'נדחה') return 'badge badge--rejected';
    return 'badge badge--pending'; // ברירת מחדל עבור "בהמתנה"
  }
}