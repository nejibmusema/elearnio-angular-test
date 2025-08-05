import { Component, input, output } from '@angular/core';
import {
  CartItem,
  CartQuantityChangeEvent,
  Product,
} from '../../../models/app.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'cart-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './cart-item.component.html',
})
export class CartItemComponent {
  item = input.required<CartItem>();
  onRemove = output<Product>();
  onQuantityChange = output<CartQuantityChangeEvent>();

  quantity: number = 1;

  ngOnInit() {
    this.quantity = this.item().quantity || 1;
  }

  removeItem = (product: Product) => {
    this.onRemove.emit(product);
  };

  updateQuantity() {
    if (this.quantity >= 1) {
      this.onQuantityChange.emit({
        product: this.item().product,
        quantity: this.quantity,
      });
    }
  }
}
