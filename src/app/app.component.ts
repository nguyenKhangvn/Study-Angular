import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'stock-market';
  isLoggedIn: boolean = false;
  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;

    });
  }
  
  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
