import { Component, input, OnInit, output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { FilterQuery, PriceRange } from '../../models/app.model';

@Component({
  selector: 'filter-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './filter-bar.component.html',
})
export class FilterBarComponent implements OnInit {
  categories = input.required<string[]>();
  priceRange = input.required<PriceRange>();
  onQueryChange = output<FilterQuery | null>();

  filterForm!: FormGroup;

  ngOnInit(): void {
    this.filterForm = this._formMaker();
  }

  private _formMaker = () => {
    return new FormGroup({
      categories: new FormControl<string[]>([]),
      priceRange: new FormGroup({
        min: new FormControl<number | null>(null, Validators.min(0)),
        max: new FormControl<number | null>(null, Validators.min(0)),
      }),
    });
  };

  submit = () => {
    debugger;
    if (this.filterForm.valid) {
      const { categories, priceRange } = this.filterForm.value;
      this.onQueryChange.emit({
        categories: [categories],
        priceRange: {
          min: priceRange.min ?? this.priceRange().min,
          max: priceRange.max ?? this.priceRange().max,
        },
      });
    }
  };

  reset = () => {
    this.filterForm.reset({
      categories: [],
      priceRange: {
        min: null,
        max: null,
      },
    });
    this.onQueryChange.emit(null);
  };
}
