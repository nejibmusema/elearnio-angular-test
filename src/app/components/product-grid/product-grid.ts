import { Component } from '@angular/core';
import { Product, FilterBar } from '..';

@Component({
  selector: 'product-grid',
  imports: [Product, FilterBar],
  templateUrl: './product-grid.html',
  styleUrl: './product-grid.scss',
})
export class ProductGrid {}
