import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';
import { AuthServiceservice } from './auth-service.service';
import { AbilityService } from './ability.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule],
  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 constructor(public auth: AuthServiceservice, public ability: AbilityService, public router: Router) {}

 ngOnInit() {
   // Check if token exists in localStorage and verify user info from API
   const token = this.auth.getToken();
   if (token) {
     // If token exists, verify it and navigate immediately
     this.auth.getUserInfo().subscribe(userInfo => {
       if (userInfo && userInfo.role) {
         const role = userInfo.role.toLowerCase() as 'admin' | 'editor' | 'guest';
         this.auth.userRole.next(role);
         this.ability.defineAbilitiesFor({ role });
         
         // Navigate to appropriate route based on role
         const currentPath = this.router.url;
         if (currentPath === '/' || currentPath === '/login' || currentPath === '/register') {
           this.router.navigate([this.auth.routeForRole(role)]);
         }
       } else {
         // Token is invalid, clear it
         this.auth.clearToken();
         this.auth.userRole.next(null);
       }
     });
   }
   
 }

  can(action: any, subject: any): boolean {
    return this.ability.getAbility().can(action, subject);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
