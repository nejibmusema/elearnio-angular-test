import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, map, tap } from 'rxjs';
import { Product, ProductsResponse } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * Simulates an HTTP GET request with a delay.
   * @returns An Observable of the products data.
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<ProductsResponse>('products.json').pipe(
      delay(2000),
      tap(() =>
        console.log(`Fetched products from mock data with a 2000ms delay.`),
      ),
      map((response) => response.products),
    );
  }
}
