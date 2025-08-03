import { Component, input, output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Product } from '../../../models/app.model';

@Component({
  selector: 'product-item',
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
})
export class ProductItemComponent {
  product = input.required<Product>();
  addToCart = output<Product>();

  onAddToCart = (product: Product) => {
    this.addToCart.emit(product);
  };
}
