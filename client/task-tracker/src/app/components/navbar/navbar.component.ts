import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}

  isLoggedIn() {
    this.authService.isLoggedIn;
  }

  logout() {
    this.authService.logout();
  }
}
