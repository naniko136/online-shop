import { Component, inject } from '@angular/core';
import { Cartservice } from '../../services/cartservice';
import { CommonModule } from '@angular/common';
import { MainService } from '../../services/main-service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  public apiService = inject(Cartservice);
  public mainService = inject(MainService);

  cart$ = this.apiService.cart$;

  increase(id: number) {
    this.apiService.increaseQty(id);
  }
  decrease(id: number) {
    this.apiService.decreaseQty(id);
  }
}
