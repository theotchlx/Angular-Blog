import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../shared/services/blogs.service';
import { Router } from '@angular/router';
import { BlogModel } from '../../interfaces/blog-model';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.css'
})
export class BlogsComponent implements OnInit {
  blogs: any[] = [];

  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBlogs();
  }

  async fetchBlogs(): Promise<void> {
    this.blogs = await this.blogService.getBlogs();
  }

  addBlog(): void {
    this.router.navigate(['/blogs/add']);
  }

  onBlogClick(blog: BlogModel): void {
    this.router.navigate(['/blogs', blog.id]);
  }

  editBlog(blog: BlogModel): void {
    this.router.navigate([`/blogs/${blog.id}/edit`]);
  }

  deleteBlog(blog: BlogModel): void {
    this.blogService.deleteBlog(blog.id)
      .then(() => {
        this.fetchBlogs();
      });
  }
}
