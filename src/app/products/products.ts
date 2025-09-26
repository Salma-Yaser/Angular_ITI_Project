import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Animation } from '../Directives/animation';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule] ,
  templateUrl: './products.html',
  styleUrl: './products.css'
})

export class Products {  
 

}



