import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogModel } from '../../interfaces/blog-model';
import { BlogService } from '../../shared/services/blogs.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: any[] = [];
  paginatedBlogs: BlogModel[] = [];
  currentPage: number = 1;
  pageSize: number = 5; // Number of blogs per page
  totalPages: number = 0;

  currentUserId: string | null = null;

  constructor(private blogService: BlogService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.fetchBlogs();
    this.totalPages = Math.ceil(this.blogs.length / this.pageSize);
    this.updatePaginatedBlogs();
    this.setCurrentUser();
  }

  updatePaginatedBlogs(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedBlogs = this.blogs.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedBlogs();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedBlogs();
    }
  }

  async setCurrentUser(): Promise<void> {
    const user = await this.userService.getCurrentUser();
    this.currentUserId = user?.id || null;
  }

  async fetchBlogs(): Promise<void> {
    this.blogs = await this.blogService.getBlogs();
    this.totalPages = Math.ceil(this.blogs.length / this.pageSize);
    this.updatePaginatedBlogs();
  }

  addBlog(): void {
    this.router.navigate(['/blogs/add']);
  }

  editBlog(blog: BlogModel): void {
    this.router.navigate([`/blogs/${blog.id}/edit`]);
  }

  async deleteBlog(blog: BlogModel): Promise<void> {
    if (confirm('Are you sure you want to delete this blog?')) {
      await this.blogService.deleteBlog(blog.id);
      this.fetchBlogs();
    }
  }

  onBlogClick(blog: BlogModel): void {
    this.router.navigate([`/blogs/${blog.id}/articles`]);
  }
  
  isOwner(blog: BlogModel): boolean {
    return this.currentUserId === blog.ownerId;
  }
}
