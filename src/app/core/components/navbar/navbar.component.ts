import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { User } from 'src/app/features/auth/models/user.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user?: User;

  constructor(private authService: AuthService,
    private router: Router,private toast:ToastService) {
  }


  ngOnInit(): void {
    this.authService.user()
      .subscribe({
        next: (response) => {
          this.user = response;
        }
      });

    this.user = this.authService.getUser();

  }

  onLogout(): void {
    if(confirm("Are you sure you want to log out")){
    this.authService.logout();
    this.router.navigateByUrl('/login');
    this.toast.info("logged out");
    } 
    // alert('Logout Successfully');
  }

}
