import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withComputed,
} from '@ngrx/signals';
import { CartItem, Product } from '../models/app.model';
import { computed } from '@angular/core';

interface CartState {
  items: CartItem[];
  loading: boolean;
  error: null | string;
}

const initialCartState: CartState = {
  items: [],
  loading: false,
  error: null,
};

export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialCartState),
  withComputed((store) => ({
    totalItems: computed(() => store.items().length),
    totalPrice: computed(() =>
      store
        .items()
        .reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    ),
  })),

  withMethods((store) => ({
    addItem: (product: Product) => {
      const existingItem = store
        .items()
        .find((i) => i.product.id === product.id);

      if (existingItem) {
        const updatedItems = store
          .items()
          .map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        patchState(store, { items: updatedItems });
      } else {
        const newItem: CartItem = { product, quantity: 1 };
        patchState(store, { items: [...store.items(), newItem] });
      }
    },
    removeItem: (productId: number) => {
      patchState(store, {
        items: store.items().filter((item) => item.product.id !== productId),
      });
    },
  })),
);
