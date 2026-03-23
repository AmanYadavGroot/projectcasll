// src/app/auth/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AbilityService } from './ability.service';
import { AuthServiceservice } from './auth-service.service';


@Injectable({ providedIn: 'root' })
export class AbilityGuard implements CanActivate {
  constructor(private abilityService: AbilityService, private auth: AuthServiceservice, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const action = route.data['action'];
    const subject = route.data['subject'];

    // Check if token exists
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Get current role from the service
    const role = this.auth.getRole();
    if (!role) {
      this.router.navigate(['/guest']);
      return false;
    }

    // Ensure abilities are defined
    const ability = this.abilityService.getAbility();
    if (!ability.rules || ability.rules.length === 0) {
      this.abilityService.defineAbilitiesFor({ role });
    }

    if (ability.can(action, subject)) {
      return true;
    }

    this.router.navigate(['/unauthorized']);
    return false;
  }
}
