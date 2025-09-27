import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="cart-wrapper container my-5">
    <div class="row" *ngIf="items.length > 0; else empty">
      <!-- Products Column -->
      <div class="col-lg-8">
        <h2 class="cart-title">PRODUCT</h2>
        <hr>
        <div *ngFor="let item of items" class="cart-item-row">
          <div class="row align-items-center py-4">
            <div class="col-md-2">
              <img [src]="item.image" class="cart-thumb" alt="{{ item.name }}">
            </div>
            <div class="col-md-7">
              <h4 class="mb-1">{{ item.name }}</h4>
              <div class="cart-price mb-1">{{ item.price | currency:'USD' }}</div>
              <!-- Removed description and vendor fields -->
              <div class="cart-qty-controls d-flex align-items-center mb-2">
                <button class="qty-btn" (click)="decrease(item)" [disabled]="item.quantity <= 1">&#8211;</button>
                <span class="qty-num mx-2">{{ item.quantity }}</span>
                <button class="qty-btn" (click)="increase(item)">+</button>
              </div>
              <a class="cart-remove" (click)="remove(item.id)">Remove item</a>
            </div>
            <div class="col-md-3 text-end">
              <div class="cart-line-total">{{ item.price * item.quantity | currency:'USD' }}</div>
            </div>
          </div>
          <hr>
        </div>
      </div>
      <!-- Totals Column -->
      <div class="col-lg-4">
        <div class="cart-totals-card p-4">
          <h4 class="mb-3">CART TOTALS</h4>
          <div class="cart-totals-row mb-2">
            <span>Add coupons</span>
            <span class="float-end">&#9660;</span>
          </div>
          <div class="cart-totals-row mb-2">
            <span>Free shipping</span>
            <span class="float-end">FREE</span>
          </div>
          <hr>
          <div class="cart-totals-row mb-3">
            <strong>Estimated total</strong>
            <span class="float-end cart-total-amount">{{ getTotal() | currency:'USD' }}</span>
          </div>
          <button
  class="btn btn-sm w-100"
  style="
    background-color: #5f6e1e;
    color: white;
    font-family: Lato, Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: 300;
    padding: 10px 20px;
    border-radius: 0;
    letter-spacing: 2px;
  "
  (click)="checkout()"
>
  Proceed to Checkout
</button>
        </div>
      </div>
    </div>
    <ng-template #empty>
      <div class="text-center py-5">
        <h4>Your cart is empty.</h4>
      </div>
    </ng-template>
  </div>
  `,
  styles: [`
    .cart-wrapper { max-width:1200px; }
    .cart-title { font-family: 'Playfair Display', serif; font-weight:700; letter-spacing:1px; }
    .cart-item-row { border-bottom:1px solid #eee; }
    .cart-thumb { width:100px; height:100px; object-fit:cover; border-radius:8px; }
    .cart-price { color:#7a7a2a; font-size:1.2rem; font-weight:500; }
    .cart-desc { color:#555; font-size:0.95rem; }
    .cart-vendor { color:#333; font-size:0.95rem; }
    .cart-qty-controls { gap:0.5rem; }
    .qty-btn { background:#f8f8f8; border:1px solid #ccc; border-radius:4px; width:32px; height:32px; font-size:1.2rem; }
    .qty-btn:disabled { opacity:0.5; cursor:not-allowed; }
    .qty-num { font-size:1.1rem; min-width:24px; text-align:center; }
    .cart-remove { color:#d9534f; text-decoration:underline; cursor:pointer; font-size:0.95rem; }
    .cart-line-total { font-size:1.2rem; color:#7a7a2a; font-weight:600; }
    .cart-totals-card { background:#fafafa; border:1px solid #eee; border-radius:8px; }
    .cart-totals-row { display:flex; justify-content:space-between; font-size:1rem; }
    .cart-total-amount { font-size:1.3rem; color:#7a7a2a; font-weight:700; }
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
    if (item.quantity > 1) {
      this.cart.updateQuantity(item.id, item.quantity - 1);
    }
  }

  remove(id: number) {
    this.cart.remove(id);
  }

  checkout() {
    alert('Checkout not implemented yet!');
  }

  getTotal(): number {
    // If cart.total exists, use it. Otherwise, sum items.
    if (this.cart && typeof this.cart.total === 'number') {
      return this.cart.total;
    }
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }
}
