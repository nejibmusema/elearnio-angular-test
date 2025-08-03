import { Component, inject, OnInit } from '@angular/core';
import { ProductsStore } from '../../store/product.store';
import { CartStore } from '../../store/cart.store';
import { Product } from '../../models/app.model';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';
import { ProductItemComponent } from './product-item/product-item.component';

@Component({
  selector: 'product-grid',
  imports: [ProductItemComponent, FilterBarComponent],
  templateUrl: './product-grid.component.html',
})
export class ProductGridComponent implements OnInit {
  productStore = inject(ProductsStore);
  cartStore = inject(CartStore);

  ngOnInit(): void {
    this.productStore.fetchProducts();
  }

  onAddToCart = (product: Product) => {
    this.cartStore.addItem(product);
  };
}
