import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../../shared/services/blogs.service';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css'
})
export class EditBlogComponent implements OnInit {
  blogForm!: FormGroup;
  blogId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.blogId = this.route.snapshot.paramMap.get('id')!;
    this.initializeForm();
    this.loadBlog();
  }

  initializeForm(): void {
    this.blogForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  async loadBlog(): Promise<void> {
    const blog = await this.blogService.getBlogById(this.blogId);
    this.blogForm.patchValue(blog);
  }

  async saveBlog(): Promise<void> {
    const updatedBlog = { ...this.blogForm.value, id: this.blogId };
    await this.blogService.editBlog(updatedBlog);
    this.router.navigate(['/blogs']);
  }

  cancel(): void {
    this.router.navigate(['/blogs']);
  }
}
