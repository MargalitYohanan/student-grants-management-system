import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Auth } from '../../service/auth'; 

@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})
export class Nav {
  
  private authService = inject(Auth);
  private readonly router = inject(Router);

  readonly currentUser = this.authService.currentUser;
  readonly isLoggedIn = this.authService.isLogIn; 
  readonly isAdmin = this.authService.isAdmin;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}