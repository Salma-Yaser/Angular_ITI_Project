import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor() {
    this.clear();
  }

  private updateStorage(items: CartItem[]) {
    localStorage.setItem('cart', JSON.stringify(items));
  }

  get snapshot(): CartItem[] {
    return this.cartSubject.getValue();
  }

  addToCart(product: { id: number; name: string; price: number; image: string }, qty = 1) {
    const items = [...this.snapshot];
    const found = items.find(i => i.id === product.id);
    if (found) {
      found.quantity += qty;
    } else {
      items.push({ ...product, quantity: qty });
    }
    this.cartSubject.next(items);
    this.updateStorage(items);
  }

  updateQuantity(id: number, qty: number) {
    let items = [...this.snapshot];
    if (qty <= 0) {
      items = items.filter(i => i.id !== id);
    } else {
      const item = items.find(i => i.id === id);
      if (item) item.quantity = qty;
    }
    this.cartSubject.next(items);
    this.updateStorage(items);
  }

  remove(id: number) {
    const items = this.snapshot.filter(i => i.id !== id);
    this.cartSubject.next(items);
    this.updateStorage(items);
  }

  clear() {
    this.cartSubject.next([]);
    localStorage.removeItem('cart');
  }

  get total() {
    return this.snapshot.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  get count() {
    return this.snapshot.reduce((sum, i) => sum + i.quantity, 0);
  }
}
