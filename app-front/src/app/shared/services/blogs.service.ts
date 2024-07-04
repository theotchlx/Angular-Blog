import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = `${environment.apiUrl}/blogs`;
  private pb: PocketBase;

  constructor() {
    this.pb = new PocketBase(environment.apiUrl);
  }

  async getBlogs(): Promise<any[]> {
    const result = await this.pb.collection('blogs').getFullList();
    return result;
  }

  async addBlog(blog: any): Promise<any> {
    const result = await this.pb.collection('blogs').create(blog);
    return result;
  }

  editBlog(blog: any): Promise<any> {
    return this.pb.collection('blogs').update(blog.id, blog);
  }

  deleteBlog(id: string): Promise<any> {
    return this.pb.collection('blogs').delete(id);
  }
}
