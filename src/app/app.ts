import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';
import { CartComponent } from './components/cart/cart.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    NavBarComponent,
    ProductGridComponent,
    FooterBarComponent,
    CartComponent,
  ],
  templateUrl: './app.html',
})
export class App {
  showCart: boolean = false;

  handleCartToggle = (isOpen: boolean) => {
    this.showCart = isOpen;
  };
}
