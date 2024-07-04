import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private apiUrl = `${environment.apiUrl}/blogs`;
  private pb: PocketBase;

  constructor() {
    this.pb = new PocketBase(environment.apiUrl);
  }

  async getArticle(articleId: string): Promise<any> {
    const result = await this.pb.collection('articles').getOne(articleId);
    return result;
  }

  async addArticle(blog: any): Promise<any> {
    const result = await this.pb.collection('articles').create(blog);
    return result;
  }

  async editArticle(blog: any): Promise<any> {
    return await this.pb.collection('articles').update(blog.id, blog);
  }

  async deleteArticle(id: string): Promise<any> {
    return await this.pb.collection('articles').delete(id);
  }
}
