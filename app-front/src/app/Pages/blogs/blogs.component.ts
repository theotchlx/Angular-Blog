import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from '../../shared/services/blogs.service';
import { Router } from '@angular/router';
import { Blog } from '../../interfaces/blog-model';

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
    this.router.navigate(['/add-blog']); // Assuming you have a route for adding a blog
  }

  onBlogClick(blog: Blog): void {
    this.router.navigate(['/blog', blog.id]); // Assuming you have a route for viewing a blog
  }

  editBlog(blog: Blog): void {
    this.router.navigate([`/blog${blog.id}/edit`]); // Assuming you have a route for editing a blog
  }

  deleteBlog(blog: Blog): void {
    this.blogService.deleteBlog(blog.id)
      .then(() => {
        this.fetchBlogs();
      });
  }
}
