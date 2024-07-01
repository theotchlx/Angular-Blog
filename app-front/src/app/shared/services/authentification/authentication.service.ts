import { Injectable } from '@angular/core';
import PocketBase, { RecordModel } from 'pocketbase';
import { UserModel } from '../../../interfaces/user-model';
import { RegisterModel } from '../../../interfaces/register-model';
import { environment } from '../../../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  user$ = this.userSubject.asObservable();

  constructor() { }

  public async login(emailAddress: string, password: string) : Promise<boolean> {  // Method to login the user
    const pocket = new PocketBase(environment.baseUrl);
    await pocket.collection('users').authWithPassword(emailAddress, password);  // Authenticate the user with the backend (pocketbase)

    // Patch userSubject with the current user data
    this.userSubject.next( { isValid: pocket.authStore.isValid, authModel: pocket.authStore.model, token: pocket.authStore.token } );

    return pocket.authStore.isValid;
  }

  public async register(registerModel: RegisterModel) : Promise<RecordModel> {  // Method to register a new user (bonus, not was not in the instructions)
    const pocket = new PocketBase(environment.baseUrl);

    return await pocket.collection('users').create(registerModel);  // Create a new user in the pocketbase backend.
  }

  public async logout() {  // Method to logout the user
    const pocket = new PocketBase(environment.baseUrl);

    return pocket.authStore.clear();
  }

  public updateUserSubject() {  // Method to patch userSubject with the current user data
    const pocket = new PocketBase(environment.baseUrl);
    this.userSubject.next({ isValid: pocket.authStore.isValid, authModel: pocket.authStore.model, token: pocket.authStore.token });
  }

}
