import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private apiUrl = `${environment.apiUrl}/blogs`;
  private pocket: PocketBase;

  constructor() {
    this.pocket = new PocketBase(environment.apiUrl);
  }

  async getArticle(articleId: string): Promise<any> {
    const result = await this.pocket.collection('articles').getOne(articleId);
    return result;
  }

  async addArticle(blog: any): Promise<any> {
    const result = await this.pocket.collection('articles').create(blog);
    return result;
  }

  async editArticle(blog: any): Promise<any> {
    return await this.pocket.collection('articles').update(blog.id, blog);
  }

  async deleteArticle(id: string): Promise<any> {
    return await this.pocket.collection('articles').delete(id);
  }
}
