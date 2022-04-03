import { Invoice } from '../invoice';

/* NgRx */
import { createReducer, on, createFeatureSelector, createSelector } from '@ngrx/store';
import * as invoiceActions from './invoice.actions';
import * as AppState from '../../state/app.state';

// Extends the app state to include the invoice feature.
// This is required because invoices are lazy loaded.
// So the reference to invoiceState cannot be added to app.state.ts directly.
export interface State extends AppState.State {
  invoices: InvoiceState;
}

// State for this feature (invoice)
export interface InvoiceState {
  showinvoiceCode: boolean;
  currentinvoice: Invoice;
  invoices: Invoice[];
}

const initialState: InvoiceState = {
  showinvoiceCode: true,
  currentinvoice: null,
  invoices: []
};

// Selector functions
const getinvoiceFeatureState = createFeatureSelector<InvoiceState>('invoices');

export const getShowinvoiceCode = createSelector(
  getinvoiceFeatureState,
  state => state.showinvoiceCode
);

export const getCurrentinvoice = createSelector(
  getinvoiceFeatureState,
  state => state.currentinvoice
);

export const getinvoices = createSelector(
  getinvoiceFeatureState,
  state => state.invoices
);

export const invoiceReducer = createReducer<InvoiceState>(
  initialState,
  on(invoiceActions.toggleinvoiceCode, (state): InvoiceState => {
    return {
      ...state,
      showinvoiceCode: !state.showinvoiceCode
    };
  }),
  on(invoiceActions.setCurrentinvoice, (state, action): InvoiceState => {
    return {
      ...state,
      currentinvoice: action.invoice
    };
  }),
  on(invoiceActions.clearCurrentinvoice, (state): InvoiceState => {
    return {
      ...state,
      currentinvoice: null
    };
  }),
  on(invoiceActions.initializeCurrentinvoice, (state): InvoiceState => {
    return {
      ...state,
      currentinvoice: {
        id: 0,
        invoiceName: '',
        invoiceCode: 'New',
        description: '',
        starRating: 0
      }
    };
  })
);
