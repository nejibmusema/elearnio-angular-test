import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';
import { Product } from '../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products').pipe(
      map((response) =>
        response.map((product) => ({
          ...product,
        })),
      ),
      catchError((error) => {
        return throwError(() => new Error('Error fetching products'));
      }),
    );
  }
}
