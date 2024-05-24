import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { CategoryListComponent } from './features/category/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EditCategoryComponent } from './features/category/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { MarkdownModule } from 'ngx-markdown';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { RegisterComponent } from './features/auth/register/register.component';
import { AngularToastifyModule } from 'angular-toastify';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IgxButtonDirective } from 'igniteui-angular';
import { BlogComponent } from './features/public/blog/blog.component';
import { UnauthorizedComponent } from './features/public/unauthorized/unauthorized.component';


@NgModule({
  declarations: [
    NavbarComponent,
    AppComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    BlogpostListComponent,
    AddBlogpostComponent,
    EditBlogpostComponent,
    HomeComponent,
    BlogDetailsComponent,
    LoginComponent,
    RegisterComponent,
    BlogComponent,
    UnauthorizedComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularToastifyModule,
    MarkdownModule.forRoot(),
    // BrowserAnimationsModule,
    // IgxButtonDirective
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    // ToastService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
