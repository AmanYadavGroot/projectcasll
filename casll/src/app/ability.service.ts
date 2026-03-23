// src/app/casl/ability.service.ts
import { Injectable } from '@angular/core';
import { Ability, AbilityBuilder, AbilityClass } from '@casl/ability';

export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete';
export type Subjects = 'Article' | 'all';

export type AppAbility = Ability<[Actions, Subjects]>;

@Injectable({
  providedIn: 'root'
})
export class AbilityService {
  constructor(private ability: Ability) {}

  /**
   * Define abilities based on user role
   * @param user - object containing role
   */
  defineAbilitiesFor(user: { role: string }) {
    const { can, cannot, build } = new AbilityBuilder<AppAbility>(Ability as AbilityClass<AppAbility>);

    switch (user.role) {
      case 'admin':
        can('manage', 'all'); // Admin can do everything
        break;
      case 'editor':
        can('read', 'Article');
        can('update', 'Article'); // Editor can read and update
        cannot('delete', 'Article'); // Cannot delete
        break;
      case 'guest':
      default:
        can('read', 'Article'); // Guest can only read
        break;
    }

    // Update the ability instance with new rules
    const built = build();
    this.ability.update(built.rules);
  }

  /**
   * Get current ability instance
   */
  getAbility(): AppAbility {
    return this.ability as AppAbility;
  }
}
