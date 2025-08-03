import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withComputed,
} from '@ngrx/signals';
import { CartItem, Product } from '../models/app.model'; // Assuming Product is also in app.model
import { computed } from '@angular/core';

// Define the state interface for the cart.
interface CartState {
  items: CartItem[];
  loading: boolean;
  error: null | string;
}

// Define the initial state for the cart store.
const initialCartState: CartState = {
  items: [],
  loading: false,
  error: null,
};

// Create the CartStore using signalStore.
export const CartStore = signalStore(
  { providedIn: 'root' },
  withState(initialCartState),

  // Add a withComputed block to derive new signals from the store's state.
  withComputed((store) => ({
    // Create a computed signal to get the total number of unique products in the cart.
    // It is now the length of the items array.
    totalItems: computed(() => store.items().length),
    totalPrice: computed(() =>
      store
        .items()
        .reduce((acc, item) => acc + item.product.price * item.quantity, 0),
    ),
  })),

  // Add a withMethods block to define functions that modify the store's state.
  withMethods((store) => ({
    /**
     * Updated addItem method to handle product objects.
     * If an item with the same product ID exists, its quantity is incremented.
     * If it doesn't exist, a new CartItem is added with a quantity of 1.
     *
     * @param product The Product object to add to the cart.
     */
    addItem: (product: Product) => {
      // Access the items signal by calling it.
      const existingItem = store
        .items()
        .find((i) => i.product.id === product.id);

      if (existingItem) {
        // If the item exists, create a new array with the item's quantity incremented.
        const updatedItems = store
          .items()
          .map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        patchState(store, { items: updatedItems });
      } else {
        // If the item does not exist, create a new CartItem with quantity 1 and add it to the cart.
        const newItem: CartItem = { product, quantity: 1 };
        patchState(store, { items: [...store.items(), newItem] });
      }
    },

    /**
     * Removes an item from the cart based on its product ID.
     * @param productId The ID of the product to remove.
     */
    removeItem: (productId: number) => {
      patchState(store, {
        items: store.items().filter((item) => item.product.id !== productId),
      });
    },
  })),
);
