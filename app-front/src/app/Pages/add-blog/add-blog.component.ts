import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BlogService } from '../../shared/services/blogs.service';
import { BlogModel } from '../../interfaces/blog-model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-add-blog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent implements OnInit {
  blogForm!: FormGroup;
  currentUserId: string | null = null;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private blogService: BlogService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.setCurrentUser();
  }

  async setCurrentUser(): Promise<void> {
    const user = await this.userService.getCurrentUser();
    this.currentUserId = user?.id || null;
  }

  initializeForm(): void {
    this.blogForm = this.fb.group({
      title: [''],
      description: [''],
    });
  }

  async saveBlog(): Promise<void> {
    if (this.currentUserId) {
      const formValues = this.blogForm.value;
      const newBlog: BlogModel = {
        id: '', // Will be generated by the backend
        ownerId: this.currentUserId,
        title: formValues.title,
        description: formValues.description,
        created: new Date(), // Current timestamp or as per backend requirement
        updated: new Date(), // Current timestamp or as per backend requirement
      };
      await this.blogService.addBlog(newBlog);
      this.router.navigate(['/blogs']);
    } else {
      alert('Unable to determine the current user.');
    }
  }

  cancel(): void {
    this.router.navigate(['/blogs']);
  }
}
