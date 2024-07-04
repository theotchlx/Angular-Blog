import { Injectable } from '@angular/core';
import PocketBase, { RecordModel } from 'pocketbase';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { RegisterModel } from '../../interfaces/register-model';
import { UserModel } from '../../interfaces/user-model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<UserModel | null> = new BehaviorSubject<UserModel | null>(null);
  user$ = this.userSubject.asObservable(); // User observable to subscribe to the user data
  private pocket: PocketBase;

  constructor() {
    this.pocket = new PocketBase(environment.apiUrl);
    this.updateUserSubject();
  }

  public async login(emailAddress: string, password: string): Promise<boolean> {
    // Method to login the user
    await this.pocket
      .collection('users')
      .authWithPassword(emailAddress, password); // Authenticate the user with the backend (pocketbase)t

    // Patch userSubject with the current user data
    this.updateUserSubject();

    return this.pocket.authStore.isValid; // Return if user is logged in or not
  }

  public async register(registerModel: RegisterModel): Promise<RecordModel> {
    // Method to register a new user (bonus, not was not in the instructions)
    return await this.pocket.collection('users').create(registerModel); // Create a new user in the pocketbase backend.
  }

  public async logout() {
    // Method to logout the user
    await this.pocket.collection('users').authRefresh(); // This is a promise that refreshes the user token BEOFRE logging out (was an annoying bug)
    return this.pocket.authStore.clear();
  }

  public updateUserSubject(): void {
    // Method to update user subject with the current user data
    // To know when the user is connected or not, at all times.
    this.userSubject.next({
      isValid: this.pocket.authStore.isValid,
      authModel: this.pocket.authStore.model,
      token: this.pocket.authStore.token,
    });
  }

  public getIsConnected() {
    // Method to get if the user is connected or not. Used by the authentication guard (for example).
    return this.pocket.authStore.isValid;
  }
}
