import { Component, inject, output } from '@angular/core';
import { CartStore } from '../../store/cart.store';

@Component({
  selector: 'nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
})
export class NavBarComponent {
  cartOpened = output<boolean>();
  cartStore = inject(CartStore);

  toggleCart() {
    this.cartOpened.emit(true);
  }
}
