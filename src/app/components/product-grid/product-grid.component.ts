import { Component, OnInit, inject } from '@angular/core';
import { FilterQuery, Product } from '../../models/app.model';
import {
  ProductsStore,
  CartStore,
  CategoryStore,
  PriceRangeStore,
} from '../../store';
import { ProductItemComponent } from './product-item/product-item.component';
import { FilterBarComponent } from '../filter-bar/filter-bar.component';
import { ProductItemSkeletonComponent } from './product-item-skeleton/product-item-skeleton.component';
@Component({
  selector: 'product-grid',
  imports: [
    ProductItemComponent,
    FilterBarComponent,
    ProductItemSkeletonComponent,
  ],
  templateUrl: './product-grid.component.html',
})
export class ProductGridComponent implements OnInit {
  skeletons: number[] = [1, 2, 3, 4, 5, 6];
  productStore = inject(ProductsStore);
  cartStore = inject(CartStore);
  categoryStore = inject(CategoryStore);
  priceRangeStore = inject(PriceRangeStore);

  ngOnInit(): void {
    this.productStore.fetchProducts();
    this.categoryStore.fetchCategories();
    this.priceRangeStore.fetchPriceRange();
  }

  onAddToCart = (product: Product) => {
    this.cartStore.addItem(product);
  };

  handleFilterChange = (query: FilterQuery | null) => {
    if (!query) {
      this.productStore.fetchProducts();
    } else {
      this.productStore.fetchProducts(query);
    }
  };
}
