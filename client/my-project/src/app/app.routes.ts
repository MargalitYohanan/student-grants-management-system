import { Routes } from '@angular/router';
import { Home } from './component/home/home';
import { Register } from './component/register/register';
import { Login } from './component/login/login';
import { MyStatus } from './component/my-status/my-status';
import { RequestForm } from './component/request-form/request-form';
import { AdminRequests } from './component/admin-requests/admin-requests';
import { AdminRequestDetail } from './component/admin-request-details/admin-request-details';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 

  { path: 'register', component: Register },
  { path: 'login', component: Login },

  { path: 'request/status', component: MyStatus },
  { path: 'request/new', component: RequestForm },

  { path: 'admin/requests', component: AdminRequests },
  { path: 'admin/requests/:id', component: AdminRequestDetail },

  { path: 'home', component: Home },

  // ניתוב מגן לכתובות שגויות
  { path: '**', redirectTo: 'login' }
];
