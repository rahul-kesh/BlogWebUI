import { Component } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  model: LoginRequest;
 

  constructor(private authService: AuthService,
    private cookieService: CookieService,
    private router: Router,
    private toast:ToastService
    ) {
    this.model = {
      email: '',
      password: ''
    };
  }

  onFormSubmit(): void {
    if(this.isFormValidate()){
    this.authService.login(this.model)
    .subscribe({
      next: (response) => {
        if(response!=null){
          // Set Auth Cookie
          this.cookieService.set('Authorization', `Bearer ${response.token}`,
          undefined, '/', undefined, true, 'Strict');
          
          // Set User
          console.log(response);
          this.authService.setUser({
            email: response.email,
            
          });
          const email = localStorage.getItem('user-email');
          this.toast.success(`logged in successfully ${email?.charAt(0).toUpperCase()}${email?.slice(1,email.indexOf('@'))}`);
          // Redirect back to Home
          this.router.navigate(['/home']);
        }else{
          this.toast.error("Invalid Credentials");
        }
        
      },
      error:(error)=>{
        alert("Error while login "+error.error);
      }

    });
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
      alert("The password length must be 5 characters.");
      isValid = false;
    }

    return isValid;
  }
}
