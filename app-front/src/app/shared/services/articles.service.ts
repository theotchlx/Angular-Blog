import { Injectable } from '@angular/core';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private pocket: PocketBase;

  constructor() {
    this.pocket = new PocketBase(environment.apiUrl);
  }

  async getArticlesByBlogId(blogId: string): Promise<any[]> {
    const result = await this.pocket.collection('articles').getFullList({
      filter: `blogId='${blogId}'`
    });
    return result;
  }

  async getArticleById(articleId: string): Promise<any> {
    const result = await this.pocket.collection('articles').getOne(articleId);
    return result;
  }

  async addArticle(article: any): Promise<any> {
    const result = await this.pocket.collection('articles').create(article);
    return result;
  }

  async editArticle(article: any): Promise<any> {
    const result = await this.pocket.collection('articles').update(article.id, article);
    return result;
  }

  async deleteArticle(articleId: string): Promise<any> {
    const result = await this.pocket.collection('articles').delete(articleId);
    return result;
  }
}
