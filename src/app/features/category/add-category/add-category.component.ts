import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnDestroy {

  model: AddCategoryRequest;
  private addCategorySubscribtion?: Subscription;

  constructor(private categoryService: CategoryService,
    private router: Router,private toast :ToastService) {
    this.model = {
      name: '',
    };
  }


  onFormSubmit() {
    this.addCategorySubscribtion = this.categoryService.addCategory(this.model)
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/blogs/categories');
        this.toast.info("Category Added");
      },
      error:(error)=>{
        alert("Error while adding category "+error.error);
      }
    })
  }

  ngOnDestroy(): void {
    this.addCategorySubscribtion?.unsubscribe();
  }

}
