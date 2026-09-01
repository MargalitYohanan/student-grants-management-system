import { Component, inject } from '@angular/core';
import { Auth } from '../../service/auth'
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly authService = inject(Auth);
  readonly currentUser = this.authService.currentUser;
}
