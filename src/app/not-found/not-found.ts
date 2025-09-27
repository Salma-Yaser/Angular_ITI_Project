import { Component } from '@angular/core';
import { FlyInDirective } from '../animation/fly-in.directive';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [FlyInDirective],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css'
})
export class NotFound {
 
}