
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AuthenticationService } from './shared/services/authentification/authentication.service';
import { Subscription } from 'rxjs';
import { UserModel } from './interfaces/user-model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, ListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'Forum Polytech';

  authService: AuthenticationService = inject(AuthenticationService);

  isLoggedIn: boolean = false;
  loggedInStatusSub?: Subscription;

  ngOnInit() {
    //If page reloades, get status
    this.authService.updateUserSubject();
    this.loggedInStatusSub = this.authService.user$.subscribe((res: UserModel | null) => {
      if(res === null) {
        this.isLoggedIn = false;
      } else if(localStorage.getItem('pocketbase_auth') !== null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
    });
  }

  ngOnDestroy(): void {
    this.loggedInStatusSub?.unsubscribe();
  }

}