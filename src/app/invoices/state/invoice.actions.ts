import { Invoice } from '../invoice';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const toggleinvoiceCode = createAction(
  '[invoice] Toggle invoice Code'
);

export const setCurrentinvoice = createAction(
  '[invoice] Set Current invoice',
  props<{ invoice: Invoice }>()
);

export const clearCurrentinvoice = createAction(
  '[invoice] Clear Current invoice'
);

export const initializeCurrentinvoice = createAction(
  '[invoice] Initialize Current invoice'
);

export const loadinvoices = createAction(
  '[invoice] Load'
);

export const loadinvoicesSuccess = createAction(
  '[invoice] Load Success',
  props<{ invoices: Invoice[] }>()
);

export const loadinvoicesFailure = createAction(
  '[invoice] Load Fail',
  props<{ error: string }>()
);
