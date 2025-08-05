import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, tap } from 'rxjs';
import {
  FilterQuery,
  PriceRange,
  Product,
  ProductsResponse,
} from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProducts(query?: FilterQuery): Observable<Product[]> {
    return this._fetchJson().pipe(
      map((response) => {
        let products = response.products;
        if (query) {
          products = this._getFilteredProducts(response.products, query);
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

  private _getFilteredProducts(
    products: Product[],
    query: FilterQuery,
  ): Product[] {
    if (query?.categories?.length) {
      products = products.filter((product) =>
        (query.categories || []).includes(product.category),
      );
    }

    if (
      query?.priceRange &&
      query.priceRange.min !== undefined &&
      query.priceRange.max !== undefined
    ) {
      const { min, max } = query.priceRange;
      products = products.filter((product) => {
        return (
          (min === null || product.price >= min) &&
          (max === null || product.price <= max)
        );
      });
    }

    if (query?.searchTerm) {
      products = products.filter((product) =>
        product.title
          .toLowerCase()
          .includes((query.searchTerm || '').toLowerCase()),
      );
    }
    if (query?.sortbyPrice) {
      products = products.sort((a, b) => {
        return query.sortbyPrice === 'asc'
          ? a.price - b.price
          : b.price - a.price;
      });
    }

    return products;
  }
}
