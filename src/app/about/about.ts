import { Component } from '@angular/core';
import { FlyInDirective } from '../animation/fly-in.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [FlyInDirective],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

}
