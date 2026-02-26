import { Component, inject } from '@angular/core';
import { MainService } from '../../services/main-service';
import { CommonModule } from '@angular/common';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { Searchcomponent } from '../searchcomponent/searchcomponent';
import { RouterLink } from '@angular/router';
import { Cartservice } from '../../services/cartservice';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, Searchcomponent, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  public apiService = inject(MainService);
  private cartService = inject(Cartservice);

  add(product: any) {
    this.cartService.addToCart(product);
  }

  // Search$ = new Subject<string>();
  // Brand$ = new Subject<string>();
  // Category$ = new Subject<string>();

  ngOnInit() {
    // combineLatest([
    //   this.Search$.pipe(startWith(''), debounceTime(400), distinctUntilChanged()),
    //   this.Brand$.pipe(startWith('')),
    //   this.Category$.pipe(startWith('')),
    // ])
    //   .pipe(
    //     switchMap(([search, brand, category]) =>
    //       this.apiService.getFilteredProducts(search, brand, category),
    //     ),
    //   )
    //   .subscribe((res) => {
    //     this.apiService.allProducts.set(res.products);
    //   });

    this.apiService.loadAllProducts();
  }
}
