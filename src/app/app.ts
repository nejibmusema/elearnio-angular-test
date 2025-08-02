import { Component } from '@angular/core';
import { ProductGrid } from './components/product-grid/product-grid';
import { NavBar } from './components/nav-bar/nav-bar';
import { FooterBar } from './components/footer-bar/footer-bar';
import { Cart } from './components/cart/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, NavBar, ProductGrid, FooterBar, Cart],
  templateUrl: './app.html',
})
export class App {
  showCart: boolean = true;
}
