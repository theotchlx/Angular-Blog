import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService: AuthenticationService = inject(AuthenticationService);  // Injected to access the authentication service login method
  router: Router = inject(Router);

  emailAddress: string = '';
  password: string = '';
  displayErrorMessage: boolean = false;  // This is to display errors to the user

  login () {
    this.authService.login(this.emailAddress, this.password)
    .then((res: boolean) => {
      if (res) {
        this.router.navigateByUrl('/blogs');
      } else {
        this.displayErrorMessage = true;
        //Handle by toast here
      }
    }).catch((err) => {
      console.log(err);
      //Handle by toast here
    });
  }
}
