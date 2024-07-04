import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../shared/services/articles.service';

@Component({
  selector: 'app-add-article',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-article.component.html',
  styleUrl: './add-article.component.css'
})
export class AddArticleComponent implements OnInit {
  articleForm!: FormGroup;
  blogId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('blogId')!;
    this.initializeForm();
  }

  initializeForm(): void {
    this.articleForm = this.fb.group({
      title: [''],
      content: ['']
    });
  }

  async saveArticle(): Promise<void> {
    const newArticle = { ...this.articleForm.value, blogId: this.blogId };
    await this.articleService.addArticle(newArticle);
    this.router.navigate([`/blogs/${this.blogId}/articles`]);
  }

  cancel(): void {
    this.router.navigate([`/blogs/${this.blogId}/articles`]);
  }
}
