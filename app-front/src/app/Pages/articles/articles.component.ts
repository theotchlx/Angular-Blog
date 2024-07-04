import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleModel } from '../../interfaces/article-model';
import { ArticleService } from '../../shared/services/articles.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: any[] = [];
  blogId: string | null = null;
  currentUserId: string | null = null;

  constructor(private articleService: ArticleService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.router.paramMap.subscribe(params => {
      this.blogId = params.get('blogId');
      if (this.blogId) {
        this.fetchArticles();
      } else {
        this.router.navigate(['/blogs']);
      }
    });
    this.fetchArticles();
    this.setCurrentUser();
  }

  async fetchArticles(): Promise<void> {
    if (this.blogId) {
      this.articles = await this.articleService.getArticlesByBlogId(this.blogId);
    }
  }

  async setCurrentUser(): Promise<void> {
    const user = await this.userService.getCurrentUser();
    this.currentUserId = user?.id || null;
  }

  addArticle(): void {
    if (this.blogId) {
      this.router.navigate([`/blogs/${this.blogId}/articles/add`]);
    }
  }

  editArticle(article: any): void {
    if (this.blogId) {
      this.router.navigate([`/blogs/${this.blogId}/articles/${article.id}/edit`]);
    }
  }

  async deleteArticle(article: any): Promise<void> {
    if (this.blogId && confirm('Are you sure you want to delete this article?')) {
      await this.articleService.deleteArticle(article.id);
      this.fetchArticles();
    }
  }

  isAuthor(article: ArticleModel): boolean {
    return this.currentUserId === article.authorId;
  }
}
