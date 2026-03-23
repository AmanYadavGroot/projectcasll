import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AbilityService } from '../ability.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-guest',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent {
  constructor(public ability: AbilityService, public router: Router) {}
}
