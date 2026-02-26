import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { IProductsinterface } from '../models/productsinterface';
import { AllProductsinterface } from '../models/all-productsinterface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private api = 'https://dummyjson.com';
  private http = inject(HttpClient);

  allProducts = signal<IProductsinterface[]>([]);

  loading = signal<boolean>(false);

  error = signal<string | null>(null);

  getFilteredProducts(search: string, brand: string, category: string) {
    return this.http
      .get<{ products: IProductsinterface[] }>(`${this.api}/products/search?q=${search}`)
      .pipe(
        map((res) => {
          let products = res.products;

          if (brand) {
            products = products.filter((p) => p.brand === brand);
          }

          if (category) {
            products = products.filter((p) => p.category === category);
          }

          return { products };
        }),
      );
  }

  getSingleProduct(id: string) {
    return this.http.get<IProductsinterface>(`${this.api}/products/${id}`);
  }

  loadAllProducts() {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<AllProductsinterface>(`${this.api}/products`).subscribe({
      next: (data) => {
        this.allProducts.set(data.products);
        console.log(data.products);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('loading allRooms error');
        console.error('loading allRooms error', err);
        this.loading.set(false);
      },
    });
  }
}
