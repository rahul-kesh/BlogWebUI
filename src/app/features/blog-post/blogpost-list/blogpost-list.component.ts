import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../auth/services/auth.service';
import jwtDecode from 'jwt-decode';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogpostListComponent implements OnInit {
  
  blogPosts$?: Observable<BlogPost[]>;
  deleteBlogPostSubscription?: Subscription;

  constructor(private blogPostService: BlogPostService,
    private router:Router,
    private toast:ToastService) {}




  ngOnInit(): void {
    this.getAllPost();
  }

  getAllPost(){
    this.blogPosts$ = this.blogPostService.getBlogPostByUserId();
  }
 
  onDelete(id:string): void {
    
      // call service and delete blogpost
      this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(id)
      .subscribe({
        next: () => {
          this.getAllPost();
          
          this.router.navigateByUrl('/blogs/blogposts');
          this.toast.info("Deleted Successfully");
          
        },
        error:(error)=>{
          alert("Error while deleting blog "+error.error);
        }
      });
    
  }
  
}
