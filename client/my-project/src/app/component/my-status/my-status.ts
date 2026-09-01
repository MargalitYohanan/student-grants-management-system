import { Component, OnInit, inject, signal } from '@angular/core';
import { Request } from '../../service/request';
import { MyStatusResponse } from '../../class/request'; 

@Component({
  selector: 'app-my-status',
  imports: [],
  templateUrl: './my-status.html',
  styleUrl: './my-status.css'
})
export class MyStatus implements OnInit {
  private requestService = inject(Request);

  //  הגדרת סיגנל שיחזיק את נתוני הסטטוס שיחזרו מהשרת (מתחיל כ-null)
  readonly status = signal<MyStatusResponse | null>(null);

  ngOnInit(): void {
    this.requestService.getMyStatus().subscribe({
      next: (res) => {
        // כאשר הנתונים מגיעים בהצלחה מהשרת, נשמור אותם בתוך הסיגנל
        this.status.set(res);
      },
      error: (err) => {
        console.error('שגיאה בטעינת הסטטוס:', err);
      }
    });
  }
}