import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecordModel } from 'pocketbase';
import { RegisterModel } from '../../interfaces/register-model';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule], // Import ReactiveFormsModule here
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // This should be 'styleUrls' instead of 'styleUrl'
})
export class RegisterComponent implements OnInit { // Implement OnInit here
  authService: AuthenticationService = inject(AuthenticationService);
  router: Router = inject(Router);
  fb: FormBuilder = inject(FormBuilder);

  fg!: FormGroup;
  
  ngOnInit(): void {
    this.fg = this.fb.group({
      email: ['', [Validators.required, Validators.email] ], 
      password: ['', [Validators.required, Validators.minLength(8)] ], 
      passwordConfirm: ['', [Validators.required, Validators.minLength(8)] ], 
      name: ['', [Validators.required, Validators.minLength(5)] ]
    });
  }

  register() {
    const registerModel: RegisterModel = {
      email: this.fg.get('email')!.value, 
      password: this.fg.get('password')!.value, 
      passwordConfirm: this.fg.get('passwordConfirm')!.value, 
      name: this.fg.get('name')!.value, 
      emailVisibility: false
    };

    this.authService.register(registerModel)
    .then((res: RecordModel) => {
      if(res['token'] != '') {
        this.router.navigateByUrl('/blogs');
      } else {
        //Handle by toast here
      }
    })
    .catch((err) => {
      console.log(err);
      //Handle by toast here
    });
  }
}
