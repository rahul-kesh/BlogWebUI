import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { UpdateCategoryRequest } from '../models/update-category-request.model';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit, OnDestroy {

  id: string | null = null;
  paramsSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  category?: Category;

  constructor(private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router,
    private toast:ToastService) {
  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        if (this.id) {
          // get the data from the API for this category Id
          this.categoryService.getCategoryById(this.id)
          .subscribe({
            next: (response) => {
              this.category = response;
            }
          });

        }
      }
    });
    
  }

  onFormSubmit(): void {
    const updateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
    };

    // pass this object to service
    if (this.id) {
      this.editCategorySubscription = this.categoryService.updateCategory(this.id, updateCategoryRequest)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/blogs/categories');
          this.toast.info("Category Updated");
        },
        error:(error)=>{
          alert("Error While Updating Category "+error.error);
        }
      });
      
    }
  }

  onDelete(): void {
    if (this.id) {
      this.categoryService.deleteCategory(this.id)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/blogs/categories');
          this.toast.info("Category Deleted");
        },
        error:(error)=>{
          alert("Error while deleting category "+error.error);
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }
}
