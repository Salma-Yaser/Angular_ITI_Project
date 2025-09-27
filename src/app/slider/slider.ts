import { Component } from '@angular/core';
import { FlyInDirective } from '../animation/fly-in.directive';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [FlyInDirective],
  templateUrl: './slider.html',
  styleUrl: './slider.css'
})
export class Slider {}
