import { Component, inject } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { MainService } from '../../services/main-service';

@Component({
  selector: 'app-searchcomponent',
  imports: [],
  templateUrl: './searchcomponent.html',
  styleUrl: './searchcomponent.scss',
})
export class Searchcomponent {
  public apiService = inject(MainService);

  Search$ = new Subject<string>();
  Brand$ = new Subject<string>();
  Category$ = new Subject<string>();

  ngOnInit() {
    combineLatest([
      this.Search$.pipe(startWith(''), debounceTime(400), distinctUntilChanged()),
      this.Brand$.pipe(startWith('')),
      this.Category$.pipe(startWith('')),
    ])
      .pipe(
        switchMap(([search, brand, category]) =>
          this.apiService.getFilteredProducts(search, brand, category),
        ),
      )
      .subscribe((res) => {
        this.apiService.allProducts.set(res.products);
      });
  }
}
