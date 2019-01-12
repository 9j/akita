import { Injectable } from '@angular/core';
import { ProductsStore } from './products.store';
import { ProductsDataService } from './products-data.service';
import { Product } from './products.model';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductsQuery } from './products.query';
import { ID, noop } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private productsStore: ProductsStore, private productsQuery: ProductsQuery, private productsDataService: ProductsDataService) {}

  /**
   *
   * @returns {Observable<Product[]>}
   */
  get(): Observable<Product[]> {
    const request = this.productsDataService.get().pipe(
      tap(response => {
        this.productsStore.set(response);
        // applyAction(
        //   () => {
        //     this.productsStore.set(response);
        //   },
        //   { type: '[Products Service] Fetch All' }
        // );
      })
    );

    return this.productsQuery.isPristine ? request : noop();
  }

  /**
   *
   * @param {ID} id
   */
  getProduct(id: ID) {
    this.productsDataService.getProduct(id).subscribe(product => {
      this.productsStore.add(product);
    });
  }
}
