import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavBarComponent,
  FooterBarComponent,
  CartComponent,
  ProductGridComponent,
} from './components';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    NavBarComponent,
    ProductGridComponent,
    FooterBarComponent,
    CartComponent,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  showCart: boolean = false;

  handleCartToggle = (isOpen: boolean) => {
    this.showCart = isOpen;
  };
}
