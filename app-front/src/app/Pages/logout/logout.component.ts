import { Component, OnInit, inject } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentification/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit {  // Implements the OnInit  component lifecycle hook to run code when the component is initialized
  // (called after the constructor is called and after the component's inputs have been initialized)
  authService: AuthenticationService = inject(AuthenticationService);
  router: Router = inject(Router);

  ngOnInit(): void {
    this.authService.logout()
    .then(() => {
      this.authService.updateUserSubject();
      this.router.navigateByUrl('/');
    })
  }
}