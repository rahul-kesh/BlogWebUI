import { Component, OnInit } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../category/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../category/models/category.model';
import { ToastService } from 'angular-toastify';


@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.css']
})
export class AddBlogpostComponent implements OnInit {
  model: AddBlogPost;
  
  categories$?: Observable<Category[]>;


  constructor(private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService,
    private toast:ToastService
    ) {
      
    this.model = {
      title: '',
      shortDescription: '',
      urlHandle: '',
      content: '',
      featuredImageUrl: '',
      author: '',
      isVisible: true,
      publishedDate: new Date(),
      categories: []
    }
  }


  ngOnInit(): void {
     this.categories$ = this.categoryService.getAllCategories();

  }

  onFormSubmit(): void {
    console.log(this.model);
    this.blogPostService.createBlogPost(this.model)
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/blogs/blogposts');
        this.toast.info("Blog Posted");
      },
      error:()=>{
        alert("Error while adding blog post ");
      }
    });
  }

  
}
