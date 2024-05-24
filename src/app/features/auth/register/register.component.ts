import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { RegisterRequest } from '../models/register-request';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  model: RegisterRequest;

  constructor(private authService: AuthService,private router: Router,private toast:ToastService) {
    this.model = {
      email: '',
      password: '',
      confirmPassword:''
    };
  }

  onFormSubmit(): void {
    
    if(this.isFormValidate()){
       
      this.authService.register(this.model)
      .subscribe({
        next:(response) => {
          // Redirect back to Home
          console.log(response);
          this.toast.info("Register Successfully");
          this.router.navigateByUrl('/login');
      
        },
        error: () => {
          this.toast.error("Email is already registered.");
        }
      } );
    }
    
    
  }

  isFormValidate() {
    let isValid = true;
    const emailPattern= /^\S+@\S+\.\S+$/;
 
    if (this.model.email == "" || this.model.email.trim() == "") {
      alert("email is required.");
      isValid = false;
    }
    
    else if (!emailPattern.test(this.model.email.trim())) {
      alert("Check email pattern.");
      isValid = false;
    }
    else if (this.model.password == "" || this.model.password.trim() == "") {
      alert("The password is required.");
      isValid = false;
    }
    else if (this.model.password.toString().length<5 ) {
 
      alert("The password length must be 5.");
      isValid = false;
    }
    else if (this.model.confirmPassword == "" || this.model.confirmPassword.trim() == "") {
      alert("The confirm password is required.");
      isValid = false;
    }
    else if (this.model.password != this.model.confirmPassword) {
      alert("The password and confirm password should be match.");
      isValid = false;
    }

    return isValid;
  }

}
