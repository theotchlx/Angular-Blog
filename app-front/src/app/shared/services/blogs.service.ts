import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment';
import { BlogModel } from '../../interfaces/blog-model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = `${environment.apiUrl}/blogs`;
  private pocket: PocketBase;

  constructor() {
    this.pocket = new PocketBase(environment.apiUrl);
  }

  async getBlogs(): Promise<any[]> {
    return await this.pocket.collection('blogs').getFullList();
  }

  async getBlogById(id: string): Promise<any> {
    return await this.pocket.collection('blogs').getOne(id);
  }

  async addBlog(blog: BlogModel): Promise<any> {
    return await this.pocket.collection('blogs').create(blog);
  }

  async editBlog(blog: BlogModel): Promise<any> {
    return await this.pocket.collection('blogs').update(blog.id, blog);
  }

  async deleteBlog(id: string): Promise<any> {
    return await this.pocket.collection('blogs').delete(id);
  }
}
