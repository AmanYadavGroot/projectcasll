import { Component, OnInit } from '@angular/core';
import { AuthServiceservice } from '../auth-service.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AbilityService } from '../ability.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 email = '';
  password = '';
  error = '';
  isLoading = false;

  constructor(private auth: AuthServiceservice, private ability: AbilityService, private router: Router) {}

  ngOnInit() {
    // Check if user already has a valid token and redirect immediately
    const token = this.auth.getToken();
    if (token) {
      this.auth.getUserInfo().subscribe(userInfo => {
        if (userInfo && userInfo.role) {
          // User has valid token, redirect to appropriate page immediately
          this.auth.handlePostLoginNavigation(this.router, this.ability);
        } else {
          // Token is invalid, clear it and stay on login page
          this.auth.clearToken();
        }
      });
    }
  }

  login() {
    this.isLoading = true;
    this.error = '';
    
    this.auth.login(this.email, this.password).subscribe(success => {
      if (success) {
        // After successful login, immediately navigate using the new method
        this.auth.handlePostLoginNavigation(this.router, this.ability);
        this.isLoading = false;
        this.error = '';
      } else {
        this.isLoading = false;
        this.error = 'Invalid credentials';
      }
    });
  }
}
