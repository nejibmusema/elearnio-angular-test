import { Component, inject, output } from '@angular/core';
import { CartItemComponent } from './cart-item/cart-item.component';
import { CartStore } from '../../store/cart.store';
import { Product } from '../../models/app.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'cart',
  imports: [CommonModule, CartItemComponent],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  closeCart = output<boolean>();
  cartStore = inject(CartStore);

  handleClose() {
    this.closeCart.emit(true);
  }

  removeItem = (product: Product) => {
    this.cartStore.removeItem(product.id);
  };
}
