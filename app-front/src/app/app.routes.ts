import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './Pages/articles/articles.component';
import { BlogsComponent } from './Pages/blogs/blogs.component';
import { EditArticleComponent } from './Pages/edit-article/edit-article.component';
import { LoginComponent } from './Pages/login/login.component';
import { LogoutComponent } from './Pages/logout/logout.component';
import { PageNotFoundComponent } from './Pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './Pages/register/register.component';
import { AuthenticationGuard } from './shared/guards/authentication.guard';

export const routes: Routes = [  // Routes follow documentation best practices.
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'logout', component: LogoutComponent},
  { path: 'blogs/:blogId/article/:articleId/edit', component: EditArticleComponent, canActivate: [AuthenticationGuard]},
  { path: 'blogs/:blogId/articles', component: ArticlesComponent, canActivate: [AuthenticationGuard]},
  { path: 'blogs', component: BlogsComponent, canActivate: [AuthenticationGuard]},
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
