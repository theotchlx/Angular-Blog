import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private pocket: PocketBase;

  constructor() {
    this.pocket = new PocketBase(environment.apiUrl);
  }

  async getCurrentUser(): Promise<any> {  // Method to get the current user data
    return this.pocket.authStore.model;
  }

  async getUserById(id: string): Promise<any> {  // Method to get the user data by ID
    return await this.pocket.collection('users').getOne(id);
  }
}
