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
  imports: [FormsModule, CommonModule, RouterLink], // <-- FormsModule must be here
  templateUrl: './products.html',
  styleUrls: ['./products.css']
})
export class Products implements OnInit {
  foodTypes: Product['category'][] = ['All','Appetizers','Main Dishes','Desserts'];
  selectedType: Product['category'] = 'All';
  priceMax = 100;

  products: Product[] = [
    { id: 1, name: 'BBQ Chicken Burger', price: 10.99, image: 'BBQ.jpg', stock: 15, rating: 4.5, category: 'Main Dishes' },
    { id: 2, name: 'Banana Pudding Cookies', price: 5.99, image: 'Banana.webp', stock: 10, rating: 4.8, category: 'Desserts' },
    { id: 3, name: 'Garlic Bread', price: 4.99, image: 'bread.jpg', stock: 100, rating: 4.2, category: 'Appetizers' },
    { id: 4, name: 'Cheesecake Slice', price: 6.49, image: 'cake.png', stock: 8, rating: 4.9, category: 'Desserts' },
    { id: 5, name: 'Grilled Salmon', price: 19.99, image: 'img1.jpg', stock: 12, rating: 4.7, category: 'Main Dishes' },
    { id: 6, name: 'Stuffed Mushrooms', price: 8.99, image: 'img2.webp', stock: 20, rating: 4.3, category: 'Appetizers' },
    { id: 7, name: 'Chocolate Lava Cake', price: 7.99, image: 'img3.jpg', stock: 9, rating: 4.9, category: 'Desserts' },
    { id: 8, name: 'Caesar Salad', price: 6.99, image: 'img4.jpg', stock: 25, rating: 4.1, category: 'Appetizers' },
    { id: 9, name: 'Steak Frites', price: 22.99, image: 'img5.jpg', stock: 7, rating: 4.6, category: 'Main Dishes' },
    { id: 10, name: 'Berry Parfait', price: 5.49, image: 'img6.jpg', stock: 18, rating: 4.4, category: 'Desserts' }
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

  onPriceChange(value: string) {
    this.priceMax = Number(value);
    this.applyFilters();
  }

  onTypeChange(value: string) {
    this.selectedType = value as Product['category'];
    this.applyFilters();
  }
}
