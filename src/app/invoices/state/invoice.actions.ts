import { Invoice } from '../Invoice';

/* NgRx */
import { createAction, props } from '@ngrx/store';

export const toggleInvoiceCode = createAction(
  '[Invoice] Toggle Invoice Code'
);

export const setCurrentInvoice = createAction(
  '[Invoice] Set Current Invoice',
  props<{ invoice: Invoice }>()
);

export const clearCurrentInvoice = createAction(
  '[Invoice] Clear Current Invoice'
);

export const initializeCurrentInvoice = createAction(
  '[Invoice] Initialize Current Invoice'
);

export const loadInvoices = createAction(
  '[Invoice] Load'
);

export const loadInvoicesSuccess = createAction(
  '[Invoice] Load Success',
  props<{ invoices: Invoice[] }>()
);

export const loadInvoicesFailure = createAction(
  '[Invoice] Load Fail',
  props<{ error: string }>()
);
