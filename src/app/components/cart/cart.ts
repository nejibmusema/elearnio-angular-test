import { Component } from '@angular/core';
import { CartItem } from '../cart-item/cart-item';

@Component({
  selector: 'cart',
  imports: [CartItem],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {}
