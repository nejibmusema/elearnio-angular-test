import { Component, input, OnInit, output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { FilterQuery, PriceRange } from '../../models/app.model';
import { priceRangeValidator } from '../../validators/priceRange.validator';

@Component({
  selector: 'filter-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './filter-bar.component.html',
})
export class FilterBarComponent implements OnInit {
  categories = input.required<string[]>();
  priceRange = input.required<PriceRange>();
  onQueryChange = output<FilterQuery>();

  query: FilterQuery = {
    sortbyPrice: 'desc',
  };

  filterForm!: FormGroup;

  ngOnInit(): void {
    this.filterForm = this._formMaker();
  }

  private _formMaker = () => {
    return new FormGroup({
      searchTerm: new FormControl<string>('', [Validators.minLength(2)]),
      categories: new FormControl<string[]>([]),
      priceRange: new FormGroup(
        {
          min: new FormControl<number | null>(null, Validators.min(0)),
          max: new FormControl<number | null>(null, Validators.min(0)),
        },
        { validators: priceRangeValidator },
      ),
    });
  };

  submit = () => {
    if (this.filterForm.valid) {
      const { categories, priceRange, searchTerm } = this.filterForm.value;
      this.query = {
        ...this.query,
        searchTerm: searchTerm?.trim() || '',
        categories: categories || [],
        priceRange: {
          min: priceRange.min ?? this.priceRange().min,
          max: priceRange.max ?? this.priceRange().max,
        },
      };
      this.onQueryChange.emit({
        ...this.query,
      });
    }
  };

  reset = () => {
    this.query = {
      sortbyPrice: 'asc',
    };
    this.filterForm.reset({
      categories: [],
      priceRange: {
        min: null,
        max: null,
      },
    });
    this.onQueryChange.emit(this.query);
  };

  sortByPrice = () => {
    this.query.sortbyPrice === 'asc'
      ? (this.query.sortbyPrice = 'desc')
      : (this.query.sortbyPrice = 'asc');
    this.onQueryChange.emit(this.query);
  };
}
