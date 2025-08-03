import { Component, input, output } from '@angular/core';
import { CartItem, Product } from '../../../models/app.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cart-item',
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  item = input.required<CartItem>();
  onRemove = output<Product>();

  removeItem = (product: Product) => {
    this.onRemove.emit(product);
  };
}
