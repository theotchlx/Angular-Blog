import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../shared/services/articles.service';

@Component({
  selector: 'app-edit-article',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.css'
})
export class EditArticleComponent implements OnInit {
  articleForm!: FormGroup;
  blogId!: string;
  articleId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('blogId')!;
    this.articleId = this.route.snapshot.paramMap.get('articleId')!;
    this.initializeForm();
    this.fetchArticle();
  }

  initializeForm(): void {
    this.articleForm = this.fb.group({
      title: [''],
      description: [''],
      content: ['']
    });
  }

  async fetchArticle(): Promise<void> {
    const article = await this.articleService.getArticleById(this.articleId);
    this.articleForm.patchValue(article);
  }

  async saveArticle(): Promise<void> {
    const updatedArticle = { ...this.articleForm.value, id: this.articleId, blogId: this.blogId };
    await this.articleService.editArticle(updatedArticle);
    this.router.navigate([`/blogs/${this.blogId}/articles`]);
  }

  cancel(): void {
    this.router.navigate([`/blogs/${this.blogId}/articles`]);
  }
}
