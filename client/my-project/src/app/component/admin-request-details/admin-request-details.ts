import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Request } from '../../service/request'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-request-details',
  imports: [RouterLink],
  templateUrl: './admin-request-details.html',
  styleUrl: './admin-request-details.css'
})
export class AdminRequestDetail implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private requestService = inject(Request);
  private cdr = inject(ChangeDetectorRef); // הזרקת רכיב השליטה ברענון המסך

  request: any = null;
  isLoading: boolean = true;
  isUserRefObject: boolean = false;
  private requestId: string = '';
  private routeSub!: Subscription;

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const newId = params.get('id') ?? '';
      
      if (newId !== this.requestId) {
        this.requestId = newId;
        this.request = null;
        this.isUserRefObject = false;
        this.isLoading = true;
        this.cdr.markForCheck(); // עדכון המערכת על איפוס הנתונים
        this.loadRequest();
      }
    });
  }

  loadRequest(): void {
    if (!this.requestId) {
      this.isLoading = false;
      this.cdr.markForCheck();
      return;
    }

    this.requestService.getRequestDetails(this.requestId).subscribe({
      next: (res: any) => {
        this.request = res;
        this.isUserRefObject = res && res.userRef && typeof res.userRef === 'object';
        console.log('הנתונים שהתקבלו מהשרת:', res);
        this.isLoading = false;
        
        // פקודה מפורשת ל-Angular לרענן את ה-HTML מיד עם הגעת הנתונים
        this.cdr.detectChanges(); 
      },
      error: (err: any) => {
        alert(err?.error?.message || 'שגיאה בטעינת פרטי הבקשה');
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  decide(status: 'אושר' | 'נדחה'): void {
    this.requestService.updateRequestStatus(this.requestId, status).subscribe({
      next: (res: any) => {
        alert(`הבקשה עודכנה בהצלחה לסטטוס: ${status}`);
        this.request = res.request;
        this.isUserRefObject = res.request && typeof res.request.userRef === 'object';
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        alert(err?.error?.message || 'שגיאה בעדכון סטטוס הבקשה');
      }
    });
  }

  badgeClass(status: string): string {
    if (status === 'אושר') return 'badge badge--approved';
    if (status === 'נדחה') return 'badge badge--rejected';
    return 'badge badge--pending';
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}