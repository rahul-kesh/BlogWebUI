import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { RegisterComponent } from './features/auth/register/register.component';
import { UnauthorizedComponent } from './features/public/unauthorized/unauthorized.component';

const routes: Routes = [
  
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'blog/:url',
    component: BlogDetailsComponent
  },
  {
    path: 'blogs/categories',
    component: CategoryListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'blogs/categories/add',
    component: AddCategoryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'blogs/categories/:id',
    component: EditCategoryComponent,
    canActivate: [authGuard]
  },
  {
    path: 'blogs/blogposts',
    component: BlogpostListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'blogs/blogposts/add',
    component: AddBlogpostComponent,
    canActivate: [authGuard]
  },
  {
    path: 'blogs/blogposts/:id',
    component: EditBlogpostComponent,
    canActivate: [authGuard]
  },
  {
    path:'Unauthorized',
    component: UnauthorizedComponent
  },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
