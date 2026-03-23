import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AbilityService } from '../ability.service';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent {
  constructor(public ability: AbilityService, public router: Router) {}
}
