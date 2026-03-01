import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MainService } from '../../services/main-service';
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Cartservice } from '../../services/cartservice';
import { IProductsinterface } from '../../models/productsinterface';

@Component({
  selector: 'app-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  private route = inject(ActivatedRoute);
  public api = inject(MainService);
  private cartService = inject(Cartservice);
  private router = inject(Router);

  selectedImage: string | null = null;

  add(product: IProductsinterface) {
    const isLoggedIn = localStorage.getItem('token');

    if (!isLoggedIn) {
      this.router.navigate(['/log-in']);
      alert('log in please');
      return;
    }

    this.cartService.addToCart(product);
  }

  product$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = params.get('id');
      return this.api.getSingleProduct(id!);
    }),
  );
}
