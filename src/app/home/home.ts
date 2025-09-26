import { Component } from '@angular/core';
import { Products } from "../products/products";
import { Slider } from "../slider/slider";

@Component({
  selector: 'app-home',
  standalone:true,
  imports: [Products, Slider],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
