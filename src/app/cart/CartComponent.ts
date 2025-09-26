import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-page">
      <h2>Your Cart</h2>
      <div *ngIf="items.length; else empty">
        <div class="cart-item" *ngFor="let item of items">
          <img [src]="item.image" class="thumb">
          <div class="info">
            <h4>{{ item.name }}</h4>
            <p>{{ item.price | currency:'USD' }}</p>
            <div>
              <button (click)="decrease(item)">-</button>
              {{ item.quantity }}
              <button (click)="increase(item)">+</button>
            </div>
            <button class="remove" (click)="remove(item.id)">Remove</button>
          </div>
          <div class="line-total">{{ item.price * item.quantity | currency:'USD' }}</div>
        </div>

        <h3>Total: {{ cart.total | currency:'USD' }}</h3>
        <button (click)="checkout()">Checkout</button>
      </div>

      <ng-template #empty>
        <p>Your cart is empty.</p>
      </ng-template>
    </div>
  `,
  styles:[`
    .cart-item { display:flex; gap:20px; align-items:center; margin-bottom:15px; }
    .thumb { width:80px; height:80px; object-fit:cover; border-radius:6px; }
    .info { flex:1; }
    .line-total { font-weight:bold; }
    .remove { background:none; border:none; color:red; cursor:pointer; }
  `]
})
export class CartComponent {
  items: CartItem[] = [];

  constructor(public cart: CartService) {
    this.cart.cart$.subscribe(c => this.items = c);
  }

  increase(item: CartItem) {
    this.cart.updateQuantity(item.id, item.quantity + 1);
  }

  decrease(item: CartItem) {
    this.cart.updateQuantity(item.id, item.quantity - 1);
  }

  remove(id: number) {
    this.cart.remove(id);
  }

  checkout() {
    alert('Checkout not implemented yet!');
  }
}
