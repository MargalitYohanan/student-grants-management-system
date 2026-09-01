import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('sg_token');

  //  אם קיים טוקן, נשכפל את הבקשה ונזריק לה את ה-Header המתאים
  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq); // שליחת הבקשה המשוכפלת עם הטוקן
  }

  // אם אין טוקן (למשל בעמוד לוגין/רגיסטר), הבקשה תמשיך כרגיל
  return next(req);
};