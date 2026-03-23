import { Component } from '@angular/core';
import { AuthServiceservice } from '../auth-service.service';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
 email = '';
  password = '';
  error = '';

  constructor(private auth: AuthServiceservice, private router: Router) {}

  register() {
    this.auth.register({ email: this.email, password: this.password }).subscribe(success => {
      if (success) {
        this.router.navigate(['/login']);
      } else {
        this.error = 'User already exists';
      }
    });
  }
}
