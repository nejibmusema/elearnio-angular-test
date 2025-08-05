import { Component, inject, output } from '@angular/core';
import { CartStore } from '../../store/cart.store';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  cartOpened = output<boolean>();
  cartStore = inject(CartStore);

  toggleCart() {
    this.cartOpened.emit(true);
  }
}
