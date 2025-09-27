import { Component } from '@angular/core';
import { Products } from "../products/products";
import { Slider } from "../slider/slider";
import { FlyInDirective } from "../animation/fly-in.directive";

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [Products, Slider, FlyInDirective ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
