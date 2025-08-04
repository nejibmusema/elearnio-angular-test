import { signalState } from '@ngrx/signals';
import { PriceRange } from '../models/app.model';

interface QueryState {
  categories: string[] | undefined;
  priceRange: PriceRange | undefined;
  sortBy: string | undefined;
}

const initialQueryState: QueryState = {
  categories: undefined,
  priceRange: undefined,
  sortBy: undefined,
};

export const QueryState = signalState({ providedIn: 'root' });
