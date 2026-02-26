import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Icartinterface } from '../models/icartinterface';

@Injectable({
  providedIn: 'root',
})
export class Cartservice {
  private cartSubject = new BehaviorSubject<any[]>([]);

  cart$ = this.cartSubject.asObservable();

  addToCart(product: any) {
    const currentCart = this.cartSubject.value;
    const existingProduct = currentCart.find((p) => p.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }
    this.cartSubject.next([...currentCart]);
  }

  increaseQty(id: number) {
    const updated = this.cartSubject.value.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );

    this.cartSubject.next(updated);
  }

  decreaseQty(id: number) {
    const updated = this.cartSubject.value
      .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
      .filter((i) => i.quantity > 0);

    this.cartSubject.next(updated);
  }

  removeFromCart(id: number) {
    const currentCart = this.cartSubject.value;
    const updateCart = currentCart.filter((p) => p.id !== id);
    this.cartSubject.next(updateCart);
  }

  clearCart() {
    this.cartSubject.next([]);
  }
}
