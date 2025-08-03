import { Component, OnInit, inject } from '@angular/core';
import { Product } from '../../models/app.model';
import { ProductsStore, CartStore } from '../../store';
import { ProductItemComponent } from './product-item/product-item.component';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';
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
