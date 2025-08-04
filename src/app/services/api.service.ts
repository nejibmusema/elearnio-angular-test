import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, tap } from 'rxjs';
import { PriceRange, Product, ProductsResponse } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProducts(query?: {
    categories: string[];
    priceRange: PriceRange;
  }): Observable<Product[]> {
    return this._fetchJson().pipe(
      map((response) => {
        debugger;
        let products = response.products;

        if (query?.categories?.length) {
          products = products.filter((product) =>
            query.categories.includes(product.category),
          );
        }

        if (query?.priceRange) {
          products = products.filter((product) => {
            const { min, max } = query.priceRange;
            return (
              (min === null || product.price >= min) &&
              (max === null || product.price <= max)
            );
          });
        }

        return products;
      }),
    );
  }

  getProductCategories(): Observable<string[]> {
    return this._fetchJson().pipe(
      map((response) => this._getUniqueCategories(response.products) || []),
    );
  }

  getPriceRange(): Observable<PriceRange> {
    return this._fetchJson().pipe(
      map((response) => this._getPriceRange(response.products)),
    );
  }

  private _fetchJson(): Observable<ProductsResponse> {
    return this.http.get<ProductsResponse>('products.json').pipe(delay(1200));
  }

  private _getUniqueCategories(products: Product[]): string[] {
    const categories = products.map((product) => product.category);
    return Array.from(new Set(categories));
  }

  private _getPriceRange(products: Product[]): PriceRange {
    const prices = products.map((product) => product.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return { min, max };
  }
}
