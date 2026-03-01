import { Component, inject } from '@angular/core';
import { MainService } from '../../services/main-service';
import { CommonModule } from '@angular/common';
import { Searchcomponent } from '../searchcomponent/searchcomponent';
import { Router, RouterLink } from '@angular/router';
import { Cartservice } from '../../services/cartservice';
import { AuthService } from '../../services/auth-service';
import { IProductsinterface } from '../../models/productsinterface';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Searchcomponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public apiService = inject(MainService);
  private cartService = inject(Cartservice);
  public authservice = inject(AuthService);

  private router = inject(Router);

  add(product: IProductsinterface) {
    const isLoggedIn = localStorage.getItem('token');

    if (!isLoggedIn) {
      this.router.navigate(['/log-in']);
      alert('log in please');
      return;
    }

    this.cartService.addToCart(product);
  }

  ngOnInit() {
    this.apiService.loadAllProducts();
  }
}
