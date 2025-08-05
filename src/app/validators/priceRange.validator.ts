import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const priceRangeValidator: ValidatorFn = (
  group: AbstractControl,
): ValidationErrors | null => {
  const min = group.get('min')?.value;
  const max = group.get('max')?.value;

  if (min != null && max != null && min > max) {
    return { invalidPriceRange: 'Min price cannot be greater than Max price' };
  }

  return null;
};
