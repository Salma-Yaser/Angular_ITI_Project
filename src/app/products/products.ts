import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';   // 👈 import

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
  rating: number;
  category: 'All' | 'Appetizers' | 'Main Dishes' | 'Desserts';
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {
  foodTypes: Product['category'][] = ['All','Appetizers','Main Dishes','Desserts'];
  selectedType: Product['category'] = 'All';
  priceMax = 100;

  products: Product[] = [
    { id:1, name:'BBQ Chicken Burger', price:10.99,
      image:'BBQ.jpg', stock:15, rating:4.5, category:'Main Dishes' },
    { id:2, name:'Banana Pudding Cookies', price:5.99,
      image:'Banana.webp', stock:10, rating:4.8, category:'Desserts' },
    { id:3, name:'Garlic Bread', price:4.99,
      image:'bread.jpg', stock:100, rating:4.2, category:'Appetizers' },
    { id:4, name:'Cheesecake Slice', price:6.49,
      image:'cake.png', stock:8, rating:4.9, category:'Desserts' }
  ];

  filtered: Product[] = [];

  constructor(private router: Router,
              private cartService: CartService) {}   // 👈 inject service

  ngOnInit(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.filtered = this.products.filter(p =>
      p.price <= this.priceMax &&
      (this.selectedType === 'All' || p.category === this.selectedType)
    );
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);   // ✅ now adds to cart
    this.router.navigate(['/cart']);
  }

  get topRated(): Product[] {
    return [...this.products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  }
}
